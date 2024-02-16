import React from 'react';
import DashTable from '@components/shared/Table/DashTable';
import {
  MutateDeleteUsers,
  fetchUsersList,
} from '@src/hooks/Queries/Users/useUsersQuery';
import { format } from 'date-fns';
import AddSupllier from './AddSupllier';

import InfoIcon from '@mui/icons-material/Info';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function SupplierTable() {
  const { data, isLoading, isFetching } = fetchUsersList();
  const { t } = useTranslation();

  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const { mutate } = MutateDeleteUsers();

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
        name="Suppliers"
        selectedIds={selectedIds}
        onDelete={deleteBranches}
        setSelectedIds={setSelectedIds}
        isFetching={isFetching}
        isLoading={isLoading}
        actions={<AddSupllier />}
        titles={[
          t('name'),
          t('code'),
          t('dateCreated'),
          t('lastUpdate'),
          t('details'),
        ]}
        data={data
          ?.filter((item) => item?.role == 'supplier')
          ?.map((item) => {
            return {
              id: item.id,
              cells: [
                item?.name,
                item?.code,
                format(new Date(item?.createdAt), ' yyyy-MM-dd - HH:mm'),
                format(new Date(item?.updatedAt), ' yyyy-MM-dd - HH:mm '),
                <>
                  <Link to={`/suppliers/${item.id}`}>
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

export default SupplierTable;
