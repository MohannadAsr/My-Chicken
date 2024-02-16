import React from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Button, CircularProgress, Paper } from '@mui/material';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import StorefrontIcon from '@mui/icons-material/Storefront';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import BarChartIcon from '@mui/icons-material/BarChart';
import { fetchUsersList } from '@src/hooks/Queries/Users/useUsersQuery';
import {
  fetchProcessesList,
  fetchfullProcessList,
} from '@src/hooks/Queries/Processes/useProcessesQuery';
import { fetchProductsList } from '@src/hooks/Queries/Products/userProductsQuery';
import { CSVLink } from 'react-csv';
import { processesToCSVData } from '@components/Processes/DownloadCSV';
import { userDto } from '@src/Api/Users/Dto';
import { format } from 'date-fns';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { productDto } from '@src/Api/Products/Dto';
import { useTranslation } from 'react-i18next';
import DashDialog from '@components/shared/Dialog/DashDialog';
import { ErrorButton } from '@src/styles/globalMuiStyls';

export const usersListToCSV = (data: userDto[]) => {
  return [
    ['Name', 'Code', 'Role,', 'Created Date'],
    ...data?.map((item) => [
      item.name,
      item.code,
      item.role,
      format(new Date(item.createdAt), ' yyyy-MM-dd - HH:mm'),
    ]),
  ];
};

export const productsListToCSV = (data: productDto[]) => {
  return [
    ['Name', 'quantity', 'Created Date'],
    ...data?.map((item) => [
      item.name,
      item.quantity,
      format(new Date(item.createdAt), ' yyyy-MM-dd - HH:mm'),
    ]),
  ];
};

function ExportData() {
  const { t } = useTranslation();
  const { data: userList, isLoading: userloading } = fetchUsersList();
  const {
    data: processesList,
    isLoading: processloading,
    refetch,
  } = fetchfullProcessList();
  const { data: productList, isLoading: productloading } = fetchProductsList();
  const [open, setOpen] = React.useState(false);

  const ExportState = (data: any[], loading: boolean) => {
    if (loading)
      return {
        icon: <CircularProgress size="small" />,
        text: 'Loading',
        disable: true,
      };
    if (data && data?.length == 0)
      return { icon: <DangerousIcon />, text: 'Keine Daten', disable: true };
    return { icon: <FileUploadIcon />, text: t('export'), disable: false };
  };

  return (
    <div>
      <div className=" flex items-center gap-3">
        <FileUploadIcon fontSize="large" />
        <h2 className=" text-lg md:text-xl font-bold">{t('exportData')}</h2>
      </div>
      <p>{t('exportDataDesc')}</p>
      <div className=" my-3 grid grid-cols-1 gap-1 lg:gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Paper className=" shadow-md flex flex-col justify-center items-center w-full gap-4 text-lg md:text-2xl mx-auto border-[2px] border-[#fe532d] p-4 rounded-md">
          <StorefrontIcon />
          <h1 className=" font-semibold">{t('branches')}</h1>
          <Button
            startIcon={
              ExportState(
                userList?.filter((item) => item?.role == 'branch') || [],
                userloading
              ).icon
            }
            disabled={
              ExportState(
                userList?.filter((item) => item?.role == 'branch') || [],
                userloading
              ).disable
            }
            style={{
              backgroundImage: 'linear-gradient(45deg,#fe532d,#ef9719)',
            }}
            className=" w-full"
          >
            <CSVLink
              data={usersListToCSV(
                userList?.filter((item) => item?.role == 'branch') || []
              )}
              separator={';'}
              filename={`branches-${new Date().toLocaleDateString(
                'en-GB'
              )}.csv`}
            >
              <span className=" md:text-base text-xs">
                {
                  ExportState(
                    userList?.filter((item) => item?.role == 'branch') || [],
                    userloading
                  ).text
                }
              </span>
            </CSVLink>
          </Button>
        </Paper>
        <Paper className=" shadow-md flex flex-col justify-center items-center w-full gap-4 text-lg md:text-2xl mx-auto border-[2px] border-[#fe532d] p-4 rounded-md">
          <PrecisionManufacturingIcon />
          <h1 className=" font-semibold">{t('suppliers')}</h1>
          <Button
            startIcon={
              ExportState(
                userList?.filter((item) => item.role == 'supplier') || [],
                userloading
              ).icon
            }
            disabled={
              ExportState(
                userList?.filter((item) => item.role == 'supplier') || [],
                userloading
              ).disable
            }
            style={{
              backgroundImage: 'linear-gradient(45deg,#fe532d,#ef9719)',
            }}
            className=" w-full"
          >
            <CSVLink
              data={usersListToCSV(
                userList?.filter((item) => item.role == 'supplier') || []
              )}
              separator={';'}
              filename={`suppliers-${new Date().toLocaleDateString(
                'en-GB'
              )}.csv`}
            >
              <span className=" md:text-base text-xs">
                {
                  ExportState(
                    userList?.filter((item) => item.role == 'supplier') || [],
                    userloading
                  ).text
                }
              </span>
            </CSVLink>
          </Button>
        </Paper>
        <Paper className=" shadow-md flex flex-col justify-center items-center w-full gap-4 text-lg md:text-2xl mx-auto border-[2px] border-[#fe532d] p-4 rounded-md">
          <FastfoodIcon />
          <h1 className=" font-semibold">{t('products')}</h1>
          <Button
            startIcon={ExportState(productList || [], userloading).icon}
            disabled={ExportState(productList || [], userloading).disable}
            style={{
              backgroundImage: 'linear-gradient(45deg,#fe532d,#ef9719)',
            }}
            className=" w-full "
          >
            <CSVLink
              data={productsListToCSV(productList || [])}
              separator={';'}
              filename={`products-${new Date().toLocaleDateString(
                'en-GB'
              )}.csv`}
            >
              <span className=" md:text-base text-xs">
                {ExportState(productList || [], userloading).text}
              </span>
            </CSVLink>
          </Button>
        </Paper>
        <Paper className=" shadow-md  flex flex-col justify-center items-center w-full gap-4 text-lg md:text-2xl mx-auto border-[2px] border-[#fe532d] p-4 rounded-md">
          <BarChartIcon />
          <h1 className=" font-semibold">{t('reports')}</h1>
          <Button
            startIcon={<FileUploadIcon />}
            style={{
              backgroundImage: 'linear-gradient(45deg,#fe532d,#ef9719)',
            }}
            className=" w-full"
            onClick={() => {
              setOpen(true);
              refetch();
            }}
          >
            <span className=" md:text-base text-xs">{t('export')}</span>
          </Button>
        </Paper>
      </div>
      <DashDialog
        title={`${t('reports')} ${t('export')}`}
        open={open}
        handleClose={() => setOpen(false)}
        body={
          <div className=" flex flex-col  gap-3 items-start justify-center my-1">
            <p>
              Um die Leistung Ihrer App zu verbessern, klicken Sie bitte auf
              „Exportieren“, um Ihre Daten herunterzuladen.
            </p>
            <div className="  flex  gap-3 items-center justify-center my-2 w-full">
              <ErrorButton onClick={() => setOpen(false)}>
                {t('close')}
              </ErrorButton>
              <Button
                startIcon={
                  ExportState(processesList || [], processloading).icon
                }
                disabled={
                  ExportState(processesList || [], processloading).disable
                }
                style={{
                  backgroundImage: 'linear-gradient(45deg,#fe532d,#ef9719)',
                }}
                onClick={() => setOpen(false)}
              >
                <CSVLink
                  data={processesToCSVData(processesList || [])}
                  separator={';'}
                  filename={`overview-${new Date().toLocaleDateString(
                    'en-GB'
                  )}.csv`}
                >
                  <span className=" md:text-base text-xs">
                    {ExportState(processesList || [], processloading).text}
                  </span>
                </CSVLink>
              </Button>
            </div>
          </div>
        }
      />
    </div>
  );
}

export default ExportData;
