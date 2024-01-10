import Form from "@/app/ui/providers/create-form";
import Breadcrumbs from "@/app/ui/articles/breadcrumbs";
import { fetchCustomers } from "@/app/lib/data";

export default async function Page() {
    const customers = await fetchCustomers();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Article", href: "/dashboard/articles" },
                    {
                        label: "Ajouter un nouvel article",
                        href: "/dashboard/articles/create",
                        active: true,
                    },
                ]}
            />
            <Form />
        </main>
    );
}
