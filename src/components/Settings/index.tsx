import React from 'react';
import UpdateAdminProfile from './UpdateAdminProfile';
import { Divider } from '@mui/material';
import ExportData from './ExportData';
import ResetData from './ResetData';

function Settings() {
  return (
    <div className=" flex flex-col gap-4">
      <UpdateAdminProfile />
      <Divider />
      <ExportData />
      <Divider />
      <ResetData />
    </div>
  );
}

export default Settings;
