import {
  Card,
  Checkbox,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ErrorButton, gradientBackGround } from '@src/styles/globalMuiStyls';
import React from 'react';
import NoTableData from './NoTableData';

function DashTable({
  name,
  data,
  titles,
  isFetching = false,
  isLoading = false,
  actions,
  selectedIds,
  setSelectedIds,
  onDelete,
  filterOptions,
}: {
  name: string;
  data: { id: string; cells: (string | JSX.Element)[] }[];
  titles: string[];
  isFetching?: boolean;
  isLoading?: boolean;
  actions?: JSX.Element;
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  onDelete: () => void;
  filterOptions?: JSX.Element;
}) {
  const addToSelectList = (id: string) => {
    const findExist = selectedIds.findIndex((item) => item == id);
    findExist == -1
      ? setSelectedIds((prev) => [...prev, id])
      : setSelectedIds((prev) => prev.filter((item) => item !== id));
  };

  const switchSelectAll = () => {
    selectedIds?.length > 0
      ? setSelectedIds([])
      : setSelectedIds([...data.map((item) => item.id)]);
  };

  if (isLoading)
    return (
      <div className=" my-10 flex justify-center items-center flex-col text-primary font-bold gap-2">
        <p>Bitte warten</p>
        <CircularProgress />
      </div>
    );

  return (
    <div className=" flex flex-col gap-3">
      <div className=" flex items-center gap-3 flex-wrap">
        {actions}
        {selectedIds?.length > 0 && (
          <ErrorButton sx={{ minWidth: 90 }} onClick={onDelete}>
            Löschen
          </ErrorButton>
        )}
      </div>
      {filterOptions && <div>{filterOptions}</div>}
      {data?.length > 0 ? (
        <TableContainer component={Card}>
          {isFetching && <LinearProgress />}
          <Table sx={{ minWidth: 250 }}>
            <TableHead
              sx={{
                fontWeight: 900,
                backgroundImage: gradientBackGround,
              }}
            >
              <TableRow>
                <TableCell>
                  <Checkbox
                    color="default"
                    onClick={switchSelectAll}
                    checked={data?.every((item) =>
                      selectedIds.includes(item.id)
                    )}
                  />
                </TableCell>
                {titles?.map((title, index) => {
                  return (
                    <TableCell
                      align="center"
                      key={index}
                      sx={{ color: '#fff', minWidth: 140 }}
                      className=" text-lg capitalize"
                    >
                      {title}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.length > 0 ? (
                data?.map((item, index) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                      }}
                    >
                      <TableCell>
                        <Checkbox
                          color="default"
                          checked={selectedIds.includes(item.id)}
                          onClick={() => addToSelectList(item.id)}
                        />
                      </TableCell>
                      {item?.cells?.map((val, valIndex) => {
                        return (
                          <TableCell
                            key={valIndex}
                            component="th"
                            scope="row"
                            align="center"
                          >
                            {val}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <NoTableData name={name} />
      )}
    </div>
  );
}

export default DashTable;
