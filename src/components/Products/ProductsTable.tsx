import React from 'react';
import DashTable from '@components/shared/Table/DashTable';
import { fetchUsersList } from '@src/hooks/Queries/Users/useUsersQuery';
import { format } from 'date-fns';
import {
  MutateDeleteProducts,
  fetchProductsList,
} from '@src/hooks/Queries/Products/userProductsQuery';
import Addproduct from './Addproduct';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from 'react-i18next';

function ProductsTable() {
  const { t } = useTranslation();
  const { data, isLoading, isFetching } = fetchProductsList();
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const { mutate } = MutateDeleteProducts();

  const deleteBranches = () => {
    mutate(selectedIds, {
      onSuccess: () => {
        setSelectedIds([]);
      },
    });
  };

  return (
    <div>
      <DashTable
        selectedIds={selectedIds}
        onDelete={deleteBranches}
        setSelectedIds={setSelectedIds}
        name={t('products')}
        isFetching={isFetching}
        isLoading={isLoading}
        actions={<Addproduct />}
        titles={[
          t('name'),
          t('quantity'),
          t('dateCreated'),
          t('lastUpdate'),
          t('Details'),
        ]}
        data={data?.map((item) => {
          return {
            id: item.id,
            cells: [
              item?.name,
              item?.quantity,
              format(new Date(item?.createdAt), ' yyyy-MM-dd - HH:mm'),
              format(new Date(item?.updatedAt), ' yyyy-MM-dd - HH:mm '),
              <>
                <Link to={`/products/${item.id}`}>
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Link>
              </>,
            ],
          };
        })}
      />
    </div>
  );
}

export default ProductsTable;
