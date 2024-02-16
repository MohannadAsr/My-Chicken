import { fetchProcessesList } from '@src/hooks/Queries/Processes/useProcessesQuery';
import React from 'react';
import ProcessTable from './ProcessTable';

export default function OverViews() {
  return (
    <div>
      <ProcessTable />
    </div>
  );
}
