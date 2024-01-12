// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: "pending" | "paid";
};

export type Provider = {
  id: string;
  name: string;
  contactname: string;
  address: string;
  email: string;
  phonenumber: string;
  password: string;
  role: string;
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, "amount"> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: "pending" | "paid";
};

export type CustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: "pending" | "paid";
};

export enum ArticleType {
  Phone = "Téléphone",
  Laptop = "Ordinateur portable",
  Tablet = "Tablette",
  Headphone = "Casque",
  Console = "Console de jeu",
  Watch = "Montre connectée",
}

export enum PhoneBrand {
  Apple = "Apple",
  Samsung = "Samsung",
  Huawei = "Huawei",
  Xiaomi = "Xiaomi",
  OnePlus = "OnePlus",
  Oppo = "Oppo",
  Honor = "Honor",
}

export enum LaptopBrand {
  Apple = "Apple",
  Dell = "Dell",
  HP = "HP",
  Lenovo = "Lenovo",
  Acer = "Acer",
  Asus = "Asus",
  MSI = "MSI",
  Samsung = "Samsung",
  Sony = "Sony",
  Toshiba = "Toshiba",
}

export enum IPhoneModel {
  iPhoneSE = "iPhone SE",
  iPhone6 = "iPhone 6",
  iPhone6S = "iPhone 6S",
  iPhone7 = "iPhone 7",
  iPhone8 = "iPhone 8",
  iPhoneX = "iPhone X",
  iPhoneXR = "iPhone XR",
  iPhoneXS = "iPhone XS",
  iPhone11 = "iPhone 11",
  iPhone11Pro = "iPhone 11 Pro",
  iPhone11ProMax = "iPhone 11 Pro Max",
  iPhoneSE2 = "iPhone SE (2nd generation)",
  iPhone12Mini = "iPhone 12 Mini",
  iPhone12 = "iPhone 12",
  iPhone12Pro = "iPhone 12 Pro",
  iPhone12ProMax = "iPhone 12 Pro Max",
  iPhone13Mini = "iPhone 13 Mini",
  iPhone13 = "iPhone 13",
  iPhone13Pro = "iPhone 13 Pro",
  iPhone13ProMax = "iPhone 13 Pro Max",
  iPhone14 = "iPhone 14",
  iPhone14Pro = "iPhone 14 Pro",
  iPhone14ProMax = "iPhone 14 Pro Max",
}

// export enum IphoneStorageCapacity {
//   64 = '64 Go',
//   128 = '128 Go',
//   '256' = '256 Go',
//   '512' = '512 Go',
// }
