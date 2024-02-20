import DashDialog from '@components/shared/Dialog/DashDialog';
import DashTable from '@components/shared/Table/DashTable';
import AddIcon from '@mui/icons-material/Add';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import InfoIcon from '@mui/icons-material/Info';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import NumbersIcon from '@mui/icons-material/Numbers';
import {
  Button,
  Card,
  Chip,
  IconButton,
  Pagination,
  Tooltip,
} from '@mui/material';
import { filterOptionsDto } from '@src/Api/Processes/Dto';
import {
  MutateDeleteProcesses,
  fetchProcessesList,
} from '@src/hooks/Queries/Processes/useProcessesQuery';
import { fetchProductsList } from '@src/hooks/Queries/Products/userProductsQuery';
import { fetchUsersList } from '@src/hooks/Queries/Users/useUsersQuery';
import { ErrorButton } from '@src/styles/globalMuiStyls';
import { format } from 'date-fns';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import DownloadCSV from './DownloadCSV';
import FilterOptions from './FilterOptions';
import ProcessesStats from './ProcessesStats';

function ProcessTable({
  filterOptions = new filterOptionsDto(),
}: {
  filterOptions?: filterOptionsDto;
}) {
  const { t } = useTranslation();
  const naviagte = useNavigate();
  const [filter, setFilter] = React.useState<filterOptionsDto>(filterOptions);
  const [pageIndex, setPageIndex] = React.useState(1);
  const { data, isLoading, isFetching, refetch } = fetchProcessesList({
    ...filter,
    pageIndex: pageIndex,
  });
  const { data: usersList } = fetchUsersList();
  const { data: productsList } = fetchProductsList();
  const { mutate } = MutateDeleteProcesses();
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [showFull, setShowFull] = React.useState<string>('');
  const [open, setOpen] = React.useState<boolean>(false);
  const showFullDetails = React.useMemo(() => {
    return data?.processes?.find((item) => item.id == showFull) || null;
  }, [showFull]);

  const handleCloseDetails = () => {
    setOpen(false);
    setShowFull('');
  };

  const delteProcesses = () => {
    mutate(selectedIds, {
      onSuccess: () => {
        setSelectedIds([]);
        setPageIndex(1);
        refetch();
      },
    });
  };

  React.useEffect(() => {
    refetch();
  }, []);

  const navigateTo = (item) => {
    const target = usersList?.find((user) => user.id == item.handlerId);
    target.role == 'supplier'
      ? naviagte(`/suppliers/${target.id}`)
      : naviagte(`/branches/${target.id}`);
  };

  const navigateToProduct = (item) => {
    const target = productsList?.find((product) => product.id == item.id);
    if (target) {
      naviagte(`/products/${target.id}`);
    }
  };

  const submitFilter = () => {
    refetch();
    setPageIndex(1);
  };

  return (
    <div className=" overflow-hidden">
      <DashTable
        selectedIds={selectedIds}
        onDelete={delteProcesses}
        setSelectedIds={setSelectedIds}
        name={t('reports')}
        isFetching={isFetching}
        isLoading={isLoading}
        filterOptions={
          <>
            <FilterOptions
              disabled={isFetching}
              initialFilters={{ ...filterOptions }}
              users={usersList}
              products={productsList}
              filter={filter}
              setFilter={setFilter}
              submitFilter={submitFilter}
            />
          </>
        }
        actions={
          <>
            <Link to={'/adminProcess'}>
              <Button startIcon={<AddIcon />}>Neuen Bericht hinzufügen</Button>
            </Link>
            {data?.processes?.length > 0 && (
              <DownloadCSV currentData={data?.processes} />
            )}
          </>
        }
        titles={[
          t('handler'),
          t('products'),
          t('dateCreated'),
          t('lastUpdate'),
          t('details'),
        ]}
        data={data?.processes?.map((item) => {
          return {
            id: item?.id,
            cells: [
              usersList?.find((user) => user.id == item.handlerId) ? (
                <p
                  className=" cursor-pointer hover:text-primary"
                  onClick={() => navigateTo(item)}
                >
                  {usersList?.find((user) => user.id == item.handlerId)?.name}
                </p>
              ) : (
                <Tooltip title="deleted user">
                  <p>{item?.handlerName}</p>
                </Tooltip>
              ),
              <>
                <div className=" flex flex-col gap-3">
                  {item?.productsList?.slice(0, 2).map((product, index) => {
                    return (
                      <Chip
                        key={index}
                        label={
                          <div className=" flex gap-3 font-semibold  items-center">
                            {productsList?.find(
                              (prod) => prod?.id == product?.id
                            ) ? (
                              <p
                                className=" cursor-pointer hover:text-primary"
                                onClick={() => navigateToProduct(product)}
                              >
                                {
                                  productsList?.find(
                                    (prod) => prod?.id == product?.id
                                  )?.name
                                }
                              </p>
                            ) : (
                              <Tooltip title="deleted Product">
                                <p>{product?.productName}</p>
                              </Tooltip>
                            )}
                            :{' '}
                            <span
                              style={{
                                color:
                                  product.quantity < 0
                                    ? '#ff0000f0'
                                    : '#03e10bf5',
                              }}
                            >
                              {product.quantity}
                            </span>
                          </div>
                        }
                      />
                    );
                  })}
                </div>
                <p>
                  {item?.productsList?.length > 2 && (
                    <IconButton
                      onClick={() => {
                        setShowFull(item.id);
                        setOpen(true);
                      }}
                    >
                      <MoreHorizIcon />
                    </IconButton>
                  )}
                </p>
              </>,
              format(new Date(item?.createdAt), ' yyyy-MM-dd - HH:mm'),
              format(new Date(item?.updatedAt), ' yyyy-MM-dd - HH:mm '),
              <>
                <IconButton
                  disabled={
                    usersList?.findIndex((user) => user.id == item.handlerId) ==
                    -1
                  }
                  onClick={() => naviagte(`/adminModifyProcess/${item.id}`)}
                >
                  <InfoIcon />
                </IconButton>
              </>,
            ],
          };
        })}
      />
      <div className=" my-4 flex items-center justify-center">
        <Pagination
          page={data?.pagination?.pageIndex || 0}
          count={data?.pagination?.totalPages || 0}
          onChange={(_e, val) => {
            setPageIndex(val);
            refetch();
          }}
        />
      </div>
      <DashDialog
        open={open}
        handleClose={() => {
          setOpen(false);
          setShowFull('');
        }}
        title={
          <div className=" text-sm md:text-md">
            {showFullDetails?.handlerName} -
            {format(
              new Date(showFullDetails?.createdAt || new Date()),
              ' yyyy-MM-dd - HH:mm'
            )}
          </div>
        }
        body={
          <div className=" flex flex-col gap-4">
            {showFullDetails?.productsList?.map((item, index) => {
              return (
                <Card
                  key={index}
                  className=" p-3 flex items-center justify-between flex-wrap"
                  sx={{ borderRadius: '9px' }}
                >
                  <div className=" flex items-center gap-3">
                    <FoodBankIcon />
                    {productsList?.find((prod) => prod?.id == item?.id) ? (
                      <p
                        className=" cursor-pointer hover:text-primary"
                        onClick={() => navigateToProduct(item)}
                      >
                        {
                          productsList?.find((prod) => prod?.id == item?.id)
                            ?.name
                        }
                      </p>
                    ) : (
                      <Tooltip title="deleted Product">
                        <p>{item?.productName}</p>
                      </Tooltip>
                    )}
                  </div>
                  <div
                    className=" flex items-center gap-3 font-bold"
                    style={{
                      color: item.quantity < 0 ? '#ff0000f0' : '#03e10bf5',
                    }}
                  >
                    <NumbersIcon />
                    <p>{item?.quantity}</p>
                  </div>
                </Card>
              );
            })}
            <ErrorButton onClick={handleCloseDetails}>Close</ErrorButton>
          </div>
        }
      />
      <ProcessesStats data={data?.stats} />
    </div>
  );
}

export default ProcessTable;
