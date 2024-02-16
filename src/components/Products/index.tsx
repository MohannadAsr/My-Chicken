import React from 'react';
import Addproduct from './Addproduct';
import ProductsTable from './ProductsTable';
import { useAuth } from '@src/hooks/useAuth';
import ProcessesPage from './ProcessesPage';
import NavBar from '@components/NavBar';
import MainLayout from '@components/layouts/MainLayout';

function Products() {
  const { GetUserData } = useAuth();
  if (GetUserData()?.role !== 'admin')
    return (
      <>
        <NavBar hideMenu />
        <div className=" my-4">
          <ProcessesPage />
        </div>
      </>
    );

  return (
    <div>
      <MainLayout>
        <ProductsTable />
      </MainLayout>
    </div>
  );
}

export default Products;
