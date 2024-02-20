import ApexBarChart from '@components/shared/ApexBarChart';
import { Card, Paper } from '@mui/material';
import { processStatsDto } from '@src/Api/Processes/Dto';
import React from 'react';

function ProcessesStats({ data }: { data: processStatsDto[] }) {
  if (!data) return <></>;

  const paperItems = data.map((item) => (
    <Paper
      key={item.id} // Make sure to set a unique key for each item
      className="p-4 text-center flex-1 h-auto flex flex-col gap-1 items-center justify-center shadow-sm"
      elevation={5}
    >
      <p>{item.name}</p>
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
    <div className="flex flex-col gap-5">
      <p className=" text-xl md:text-3xl font-semibold">Produktstatistik</p>
      <div className="flex flex-wrap gap-2 ">{paperItems}</div>
      <ApexBarChart data={data} />
    </div>
  );
}

export default ProcessesStats;
