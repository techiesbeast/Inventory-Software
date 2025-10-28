import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider, useData } from './hooks/useData';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CrudPage from './pages/CrudPage';
import { getCustomerColumns, getProductColumns, getVendorColumns, getSaleColumns, getPurchaseColumns } from './constants';

const AppRoutes = () => {
  const { data } = useData();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="customers" element={<CrudPage title="Customers" dataKey="customers" columns={getCustomerColumns()} />} />
        <Route path="vendors" element={<CrudPage title="Vendors" dataKey="vendors" columns={getVendorColumns()} />} />
        <Route path="products" element={<CrudPage title="Products" dataKey="products" columns={getProductColumns()} />} />
        <Route path="sales" element={<CrudPage title="Sales" dataKey="sales" columns={getSaleColumns()} />} />
        <Route path="purchases" element={<CrudPage title="Purchase" dataKey="purchases" columns={getPurchaseColumns(data)} />} />
        <Route path="inventory" element={<CrudPage title="Inventory" dataKey="products" columns={getProductColumns(['name', 'sku', 'category', 'stockQuantity', 'price'])} readOnly />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <DataProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </DataProvider>
  );
}

export default App;
