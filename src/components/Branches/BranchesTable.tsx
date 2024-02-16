import DashTable from '@components/shared/Table/DashTable';
import {
  MutateDeleteUsers,
  fetchUsersList,
} from '@src/hooks/Queries/Users/useUsersQuery';
import { format } from 'date-fns';
import AddBranch from './AddBranch';
import React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function BranchesTable() {
  const { data, isLoading, isFetching } = fetchUsersList();
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const { mutate } = MutateDeleteUsers();
  const { t } = useTranslation();

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
        name={t('branches')}
        selectedIds={selectedIds}
        onDelete={deleteBranches}
        setSelectedIds={setSelectedIds}
        isFetching={isFetching}
        actions={<AddBranch />}
        isLoading={isLoading}
        titles={[
          t('name'),
          t('code'),
          t('dateCreated'),
          t('lastUpdate'),
          t('details'),
        ]}
        data={data
          ?.filter((item) => item?.role == 'branch')
          ?.map((item) => {
            return {
              id: item.id,
              cells: [
                item?.name,
                item?.code,
                format(new Date(item?.createdAt), ' yyyy-MM-dd - HH:mm'),
                format(new Date(item?.updatedAt), ' yyyy-MM-dd - HH:mm '),
                <>
                  <Link to={`/branches/${item.id}`}>
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

export default BranchesTable;
