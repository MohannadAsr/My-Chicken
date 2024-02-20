import ApexBarChart from '@components/shared/ApexBarChart';
import { Card, Paper } from '@mui/material';
import { processStatsDto } from '@src/Api/Processes/Dto';
import { productDto } from '@src/Api/Products/Dto';
import React from 'react';
import { Link } from 'react-router-dom';

function ProcessesStats({
  data,
  productsList,
}: {
  data: processStatsDto[];
  productsList: productDto[];
}) {
  if (!data) return <></>;

  const paperItems = data.map((item) => (
    <Paper
      key={item.id} // Make sure to set a unique key for each item
      className="p-4 text-center flex-1 h-auto flex flex-col gap-1 items-center justify-center shadow-sm"
      elevation={5}
    >
      <Link
        to={
          productsList?.find((product) => product?.id == item?.id)?.id
            ? `/products/${
                productsList?.find((product) => product?.id == item?.id)?.id
              }`
            : null
        }
      >
        <p>{item.name}</p>
      </Link>
      <p
        className={`${
          item.totalCount < 0 ? 'text-red-500' : 'text-success'
        } font-bold`}
      >
        {item.totalCount}
      </p>
    </Paper>
  ));

  return (
    <div className="flex flex-col gap-5 px-1 md:px-3">
      <p className=" text-xl md:text-3xl font-semibold">Produktstatistik</p>
      <div className="flex flex-wrap gap-2 ">{paperItems}</div>
      <ApexBarChart data={data} />
    </div>
  );
}

export default ProcessesStats;
