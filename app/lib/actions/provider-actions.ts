"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import bcrypt from "bcrypt";

const ProviderSchema = z.object({
  id: z.string(),
  name: z.string().min(3),
  address: z.string().min(3),
  contactname: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  phonenumber: z.string().min(8),
  role: z.string().min(3),
});

// Remove it?
export type State = {
  errors?: {
    name: string[];
    email: string[];
    password: string[];
    role: string[];
  };
  message?: string | null;
};

const CreateProvider = ProviderSchema.omit({ id: true, role: true });

const UpdateUser = ProviderSchema;

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialSignin";
    }
    throw error;
  }
}

export async function createProvider(formData: FormData) {
  console.log("HELLO");
  const validatedFields = CreateProvider.safeParse({
    name: formData.get("name"),
    contactname: formData.get("contactname"),
    address: formData.get("address"),
    email: formData.get("email"),
    phonenumber: formData.get("phonenumber"),
    password: formData.get("password"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create User.",
    };
  }

  // Prepare data for insertion into the database
  const { name, contactname, address, email, phonenumber, password } =
    validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await sql`
            INSERT INTO providers (name, contactName, address, email, phoneNumber, password, role)
            VALUES (${name}, ${contactname}, ${address}, ${email}, ${phonenumber}, ${hashedPassword}, ${"provider"})
        `;
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to Create User.",
    };
  }

  console.log("test");
  revalidatePath("/dashboard/providers");

  console.log("retest");
  redirect("/dashboard/providers");
}

export async function updateUser(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateUser.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update User.",
    };
  }

  const { name, email, role, password } = validatedFields.data;

  try {
    await sql`
      UPDATE users
      SET name = ${name}, email = ${email}, , role = ${role}, password = ${password}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Update User." };
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}

export async function deleteUser(id: string) {
  try {
    await sql`DELETE FROM users WHERE id = ${id}`;
    revalidatePath("/dashboard/users");
    return { message: "Deleted user." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete User." };
  }
}
