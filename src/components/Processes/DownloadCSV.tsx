import { Button } from '@mui/material';
import { processDataDto } from '@src/Api/Processes/Dto';
import React from 'react';
import { CSVLink } from 'react-csv';
import { format } from 'date-fns';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useTranslation } from 'react-i18next';

const headers = [
  { label: 'HandlerName', key: 'name' },
  { label: 'Product', key: 'Product' },
  { label: 'Quantity', key: 'quantity' },
  { label: 'Date Created', key: 'dateCreated' },
  { label: 'Last Update', key: 'lastUpdated' },
];

export const processesToCSVData = (process: processDataDto[]) => {
  const FlatProcesss = process.flatMap((item) =>
    item.productsList.map((product) => ({
      handlerName: item.handlerName,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      product: product.productName,
      quantity: product.quantity,
    }))
  );
  return [
    headers.map((head) => head.label), // Header row
    ...FlatProcesss.map((process) => [
      process?.handlerName || '',
      process?.product,
      process.quantity,
      format(new Date(process?.createdAt), ' yyyy-MM-dd - HH:mm'),
      format(new Date(process?.updatedAt), ' yyyy-MM-dd - HH:mm'),
    ]),
  ];
};

//   return (
//     process?.map((item) => {
//       return {
//         name: item?.handlerName,
//         dateCreated: item?.createdAt,
//         lastUpdated: item?.updatedAt,
//         productList: item?.productsList
//           .map((product) => ` ${product?.productName} > ${product?.quantity}`)
//           .join('|'),
//       };
//     }) || null
//   );

function DownloadCSV({ currentData }: { currentData: processDataDto[] }) {
  const { t } = useTranslation();
  if (!processesToCSVData(currentData)) return <></>;
  return (
    <div>
      <Button
        startIcon={<FileUploadIcon />}
        style={{ backgroundImage: 'linear-gradient(45deg,#fe532d,#ef9719)' }}
      >
        <CSVLink
          data={processesToCSVData(currentData)}
          separator={';'}
          filename={`overview-${new Date().toLocaleDateString('en-GB')}.csv`}
        >
          {t('export')}
        </CSVLink>
      </Button>
    </div>
  );
}

export default DownloadCSV;
