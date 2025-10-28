import type { ReactNode } from 'react';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
}

export interface Vendor {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stockQuantity: number;
  reorderLevel: number;
  vendorId: string;
}

export interface Sale {
  id: string;
  productId: string;
  customerId: string;
  quantity: number;
  totalPrice: number;
  date: string;
}

export interface Purchase {
  id: string;
  productId: string;
  vendorId: string;
  quantity: number;
  purchasePrice: number;
  date: string;
}

export type DataModel = Customer | Vendor | Product | Sale | Purchase;

export type DataKey = 'customers' | 'vendors' | 'products' | 'sales' | 'purchases';

export interface AppData {
  customers: Customer[];
  vendors: Vendor[];
  products: Product[];
  sales: Sale[];
  purchases: Purchase[];
}

export interface Column<T> {
  accessor: string;
  header: string;
  // FIX: Imported ReactNode and used it to fix 'Cannot find namespace React' error.
  render?: (item: T) => ReactNode;
  sortable?: boolean;
  isFormField?: boolean;
}
