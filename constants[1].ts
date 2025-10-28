import type { Customer, Vendor, Product, Sale, Purchase, AppData, Column } from './types';

// IMPORTANT: Replace this with your Google Apps Script Web App URL
export const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

export const MOCK_DATA: AppData = {
  customers: [
    { id: 'C001', name: 'Alice Johnson', email: 'alice@example.com', phone: '123-456-7890', joinDate: '2023-01-15' },
    { id: 'C002', name: 'Bob Smith', email: 'bob@example.com', phone: '234-567-8901', joinDate: '2023-02-20' },
    { id: 'C003', name: 'Charlie Brown', email: 'charlie@example.com', phone: '345-678-9012', joinDate: '2023-03-05' },
    { id: 'C004', name: 'Diana Prince', email: 'diana@example.com', phone: '456-789-0123', joinDate: '2023-04-10' },
    { id: 'C005', name: 'Ethan Hunt', email: 'ethan@example.com', phone: '567-890-1234', joinDate: '2023-05-25' },
  ],
  vendors: [
    { id: 'V001', name: 'Fresh Produce Inc.', contactPerson: 'John Appleseed', email: 'john@fp.com', phone: '987-654-3210' },
    { id: 'V002', name: 'Global Goods', contactPerson: 'Jane Doe', email: 'jane@gg.com', phone: '876-543-2109' },
  ],
  products: [
    { id: 'P001', name: 'Organic Apples', sku: 'FR-AP-01', category: 'Fruits', price: 2.99, stockQuantity: 150, reorderLevel: 50, vendorId: 'V001' },
    { id: 'P002', name: 'Whole Milk', sku: 'DR-MK-01', category: 'Dairy', price: 3.49, stockQuantity: 80, reorderLevel: 30, vendorId: 'V002' },
    { id: 'P003', name: 'Sourdough Bread', sku: 'BK-BR-01', category: 'Bakery', price: 5.99, stockQuantity: 45, reorderLevel: 20, vendorId: 'V002' },
    { id: 'P004', name: 'Chicken Breast', sku: 'MT-CK-01', category: 'Meat', price: 9.99, stockQuantity: 60, reorderLevel: 25, vendorId: 'V001' },
    { id: 'P005', name: 'Cheddar Cheese', sku: 'DR-CH-01', category: 'Dairy', price: 6.49, stockQuantity: 25, reorderLevel: 30, vendorId: 'V002' },
    { id: 'P006', name: 'Tomatoes', sku: 'VG-TM-01', category: 'Vegetables', price: 1.99, stockQuantity: 120, reorderLevel: 40, vendorId: 'V001' },
  ],
  sales: [
    { id: 'S001', productId: 'P001', customerId: 'C001', quantity: 5, totalPrice: 14.95, date: '2023-06-01' },
    { id: 'S002', productId: 'P002', customerId: 'C002', quantity: 2, totalPrice: 6.98, date: '2023-06-01' },
    { id: 'S003', productId: 'P003', customerId: 'C001', quantity: 1, totalPrice: 5.99, date: '2023-06-02' },
    { id: 'S004', productId: 'P005', customerId: 'C003', quantity: 3, totalPrice: 19.47, date: '2023-06-03' },
    { id: 'S005', productId: 'P001', customerId: 'C002', quantity: 10, totalPrice: 29.90, date: '2023-06-04' },
    { id: 'S006', productId: 'P004', customerId: 'C004', quantity: 2, totalPrice: 19.98, date: '2023-06-04' },
    { id: 'S007', productId: 'P006', customerId: 'C005', quantity: 4, totalPrice: 7.96, date: '2023-06-05' },
    { id: 'S008', productId: 'P002', customerId: 'C001', quantity: 3, totalPrice: 10.47, date: '2023-06-05' },
  ],
  purchases: [
    { id: 'PO001', productId: 'P001', vendorId: 'V001', quantity: 100, purchasePrice: 1.50, date: '2023-05-15' },
    { id: 'PO002', productId: 'P002', vendorId: 'V002', quantity: 50, purchasePrice: 2.00, date: '2023-05-20' },
  ],
};

export const getCustomerColumns = (): Column<Customer>[] => ([
    { accessor: 'id', header: 'ID' },
    { accessor: 'name', header: 'Name' },
    { accessor: 'email', header: 'Email' },
    { accessor: 'phone', header: 'Phone' },
    { accessor: 'joinDate', header: 'Join Date' },
]);

export const getVendorColumns = (): Column<Vendor>[] => ([
    { accessor: 'id', header: 'ID' },
    { accessor: 'name', header: 'Name' },
    { accessor: 'contactPerson', header: 'Contact' },
    { accessor: 'email', header: 'Email' },
    { accessor: 'phone', header: 'Phone' },
]);

export const getProductColumns = (fields: (keyof Product)[] = ['id', 'name', 'sku', 'category', 'price', 'stockQuantity', 'reorderLevel', 'vendorId']): Column<Product>[] => {
  const allColumns: { [key in keyof Product | string]: Column<Product> } = {
    id: { accessor: 'id', header: 'ID' },
    name: { accessor: 'name', header: 'Name' },
    sku: { accessor: 'sku', header: 'SKU' },
    category: { accessor: 'category', header: 'Category' },
    price: { accessor: 'price', header: 'Price' },
    stockQuantity: { accessor: 'stockQuantity', header: 'Stock' },
    reorderLevel: { accessor: 'reorderLevel', header: 'Reorder Level' },
    vendorId: { accessor: 'vendorId', header: 'Vendor ID' },
  };
  return fields.map(field => allColumns[field]);
};

export const getSaleColumns = (): Column<Sale>[] => ([
    { accessor: 'id', header: 'ID' },
    { accessor: 'productId', header: 'Product ID' },
    { accessor: 'customerId', header: 'Customer ID' },
    { accessor: 'quantity', header: 'Quantity' },
    { accessor: 'totalPrice', header: 'Total Price' },
    { accessor: 'date', header: 'Date' },
]);

export const getPurchaseColumns = (appData: AppData): Column<Purchase>[] => {
    const { products, vendors } = appData;

    return [
        { accessor: 'id', header: 'SN Code' },
        { 
            accessor: 'productId', 
            header: 'Product Name',
            render: (item) => products.find(p => p.id === item.productId)?.name || item.productId
        },
        { 
            accessor: 'vendorId', 
            header: 'Vendor',
            render: (item) => vendors.find(v => v.id === item.vendorId)?.name || item.vendorId
        },
        { accessor: 'date', header: 'Date' },
        { accessor: 'quantity', header: 'Units' },
        { 
            accessor: 'purchasePrice', 
            header: 'Cost',
            render: (item) => `${item.purchasePrice.toLocaleString()} ₹`
        },
        {
            accessor: 'amount',
            header: 'Amount',
            render: (item) => (item.quantity * item.purchasePrice).toLocaleString(),
            sortable: false,
            isFormField: false,
        }
    ];
};
