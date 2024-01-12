import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import type { Provider } from "@/app/lib/definitions";
import bcrypt from "bcrypt";

async function getProvider(email: string): Promise<Provider | undefined> {
  try {
    const user =
      await sql<Provider>`SELECT * FROM providers WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: "text",
        },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const provider = await getProvider(email);
          if (!provider) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            provider.password
          );
          if (passwordsMatch) return provider;
        }
        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
