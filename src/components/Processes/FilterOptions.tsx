import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { filterOptionsDto } from '@src/Api/Processes/Dto';
import { productDto } from '@src/Api/Products/Dto';
import { userDto } from '@src/Api/Users/Dto';
import React from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function FilterOptions({
  users,
  products,
  filter,
  setFilter,
  submitFilter,
  initialFilters,
  disabled,
}: {
  users: userDto[];
  products: productDto[];
  filter: filterOptionsDto;
  setFilter: React.Dispatch<React.SetStateAction<filterOptionsDto>>;
  submitFilter: () => void;
  initialFilters: filterOptionsDto;
  disabled: boolean;
}) {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  return (
    <div className=" grid grid-cols-2 lg:grid-cols-3 items-center xl:grid-cols-6 gap-3">
      <FormControl>
        <InputLabel>{t('handler')}</InputLabel>
        <Select
          disabled={
            pathname.startsWith('/branches') ||
            pathname.startsWith('/suppliers')
          }
          label={t('handler')}
          value={filter.handlerId}
          onChange={(e) => {
            setFilter((prev) => {
              return { ...prev, handlerId: e.target.value };
            });
          }}
        >
          <MenuItem value={''}>None</MenuItem>
          {users
            ?.filter((item) => item.role !== 'admin')
            .map((item, index) => (
              <MenuItem key={index} value={item.id}>
                {item.name} - {[item.role]}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <div>
        <TextField
          disabled={
            pathname.startsWith('/branches') ||
            pathname.startsWith('/suppliers')
          }
          label={t('handlerName')}
          className=" w-full"
          value={filter.handlerName}
          onChange={(e) => {
            setFilter((prev) => {
              return { ...prev, handlerName: e.target.value };
            });
          }}
        />
      </div>
      <FormControl>
        <InputLabel>{t('products')}</InputLabel>
        <Select
          disabled={pathname.startsWith('/products')}
          sx={{ maxHeight: '55px' }}
          label={t('products')}
          multiple
          value={filter.productId}
          onChange={(e) => {
            setFilter((prev) => {
              return { ...prev, productId: e.target.value };
            });
          }}
        >
          {products?.map((item, index) => (
            <MenuItem key={index} value={item.id}>
              <Checkbox checked={filter.productId.includes(item.id)} />
              {item?.name} - {[item?.quantity]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div>
          <DatePicker
            closeOnSelect={false}
            label={t('startDate')}
            className=" w-full"
            value={filter.startDate}
            onChange={(val) => {
              setFilter((prev) => {
                return { ...prev, startDate: val };
              });
            }}
          />
        </div>
        <div className=" col-span-2 md:col-span-1">
          <DatePicker
            label={t('endDate')}
            closeOnSelect={false}
            className=" w-full"
            value={filter.endDate}
            onChange={(val) => {
              setFilter((prev) => {
                return { ...prev, endDate: val };
              });
            }}
          />
        </div>
      </LocalizationProvider>

      <div className=" flex flex-wrap items-center gap-3 col-span-2 md:col-span-1">
        <Button
          disabled={disabled}
          className=" w-full"
          startIcon={<FilterAltIcon />}
          onClick={submitFilter}
        >
          {t('filter')}
        </Button>
        <Button
          disabled={disabled}
          className=" w-full"
          startIcon={<RestartAltIcon />}
          onClick={() => {
            setFilter(initialFilters);
            setTimeout(() => {
              submitFilter();
            }, 300);
          }}
        >
          {t('reset')}
        </Button>
      </div>
    </div>
  );
}

export default FilterOptions;
