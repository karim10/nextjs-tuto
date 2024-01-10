import Image from "next/image";
import { UpdateInvoice, DeleteInvoice } from "@/app/ui/articles/buttons";
import InvoiceStatus from "@/app/ui/articles/status";
import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
import { fetchProviders } from "@/app/lib/data";

export default async function ProvidersTable() {
    const providers = await fetchProviders();

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    {/* <div className="md:hidden">
                        {providers?.map((provider) => (
                            <div
                                key={invoice.id}
                                className="mb-2 w-full rounded-md bg-white p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <div className="mb-2 flex items-center">
                                            <Image
                                                src={invoice.image_url}
                                                className="mr-2 rounded-full"
                                                width={28}
                                                height={28}
                                                alt={`${invoice.name}'s profile picture`}
                                            />
                                            <p>{invoice.name}</p>
                                        </div>
                                        <p className="text-sm text-gray-500">{invoice.email}</p>
                                    </div>
                                    <InvoiceStatus status={invoice.status} />
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div>
                                        <p className="text-xl font-medium">
                                            {formatCurrency(invoice.amount)}
                                        </p>
                                        <p>{formatDateToLocal(invoice.date)}</p>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <UpdateInvoice id={invoice.id} />
                                        <DeleteInvoice id={invoice.id} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> */}
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Name
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Contact name
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Address
                                </th>

                                <th scope="col" className="px-3 py-5 font-medium">
                                    Phone number
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Email
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Password
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {providers?.map((provider) => (
                                <tr
                                    key={provider.id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    {/* <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex items-center gap-3">
                                            <Image
                                                src={provider.image_url}
                                                className="rounded-full"
                                                width={28}
                                                height={28}
                                                alt={`${provider.name}'s profile picture`}
                                            />
                                            <p>{provider.name}</p>
                                        </div>
                                    </td> */}
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {provider.name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {provider.contactname}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {provider.address}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {provider.phonenumber}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {provider.email}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {provider.password}
                                    </td>
                                    {/* <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                            <UpdateInvoice id={provider.id} />
                                            <DeleteInvoice id={provider.id} />
                                        </div>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
