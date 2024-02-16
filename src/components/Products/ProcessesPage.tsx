import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Slider,
  TextField,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { fetchProductsList } from '@src/hooks/Queries/Products/userProductsQuery';
import { useAuth } from '@src/hooks/useAuth';
import { ErrorMessage, Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import NumbersIcon from '@mui/icons-material/Numbers';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { MutateCreateProcess } from '@src/hooks/Queries/Processes/useProcessesQuery';
import { useTranslation } from 'react-i18next';
import { ErrorButton } from '@src/styles/globalMuiStyls';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function ProcessesPage() {
  const { t } = useTranslation();
  const { data: ProductList, refetch } = fetchProductsList();
  const { mutate, isPending } = MutateCreateProcess();
  const [selectedProducts, SetSelectedProducts] = React.useState<
    { id: string; quantity: number }[]
  >([]);
  const { GetUserData } = useAuth();

  const [currentPorduct, setCurrentProduct] = React.useState<{
    id: string;
    quantity: number;
  }>({ id: '', quantity: 0 });

  const TargetProduct = React.useMemo(() => {
    return ProductList?.find((item) => item?.id == currentPorduct?.id);
  }, [currentPorduct]);

  const ValidationSchema = yup.object({
    id: yup.string().required('Please Choose a Product'),
    quantity: yup.number().min(1).required('Please Choose the Product Value'),
  });

  const submit = (values: { id: string; quantity: number }) => {
    SetSelectedProducts((prev) => [
      ...prev,
      {
        ...values,
      },
    ]);
    setCurrentProduct({ id: '', quantity: 0 });
  };

  const deleteItem = (Sindex: number) => {
    SetSelectedProducts((prev) =>
      prev.filter((item, index) => index !== Sindex)
    );
  };

  const createProcess = () => {
    mutate(
      {
        handlerId: GetUserData().id,
        createdAt: null,
        productsList: selectedProducts.map((item) => {
          return {
            ...item,
            productName: ProductList?.find((prod) => prod.id == item.id)?.name,
            quantity:
              GetUserData().role == 'branch'
                ? item.quantity * -1
                : item.quantity,
          };
        }),
      },
      {
        onSuccess: () => {
          SetSelectedProducts([]);
          refetch();
        },
      }
    );
  };

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 px-3">
      <Formik
        onSubmit={submit}
        validationSchema={ValidationSchema}
        initialValues={currentPorduct}
        enableReinitialize
      >
        <Form>
          <div className=" flex flex-col gap-4">
            <h2 className=" text-xl md:text-3xl"> Neues Produkt hinzufügen</h2>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {t('products')}
              </InputLabel>
              <Select
                placeholder="Please Select a Product"
                label="Products"
                value={currentPorduct?.id}
                onChange={(e) => {
                  setCurrentProduct({
                    ...currentPorduct,
                    id: e.target.value,
                    quantity: 0,
                  });
                }}
              >
                {ProductList?.filter((item) =>
                  selectedProducts.findIndex(
                    (select) => select.id == item.id
                  ) == -1 &&
                  ((Number(item.quantity) !== 0 &&
                    GetUserData().role == 'branch') ||
                    GetUserData().role == 'supplier')
                    ? true
                    : false
                ).map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {TargetProduct && (
              <div className=" flex items-center gap-3">
                <ErrorButton
                  sx={{ fontSize: 25, height: 55 }}
                  disabled={currentPorduct.quantity - 1 <= 0}
                  onClick={() => {
                    setCurrentProduct({
                      ...currentPorduct,
                      quantity: currentPorduct.quantity - 1,
                    });
                  }}
                >
                  <RemoveIcon />
                </ErrorButton>
                <TextField
                  className=" w-full"
                  value={currentPorduct?.quantity || 0}
                  type="number"
                  onChange={(e) => {
                    setCurrentProduct({
                      ...currentPorduct,
                      quantity:
                        e.target.value < TargetProduct?.quantity ||
                        GetUserData().role !== 'branch'
                          ? Number(e.target.value)
                          : Number(TargetProduct?.quantity) || 0,
                    });
                  }}
                />
                <Button
                  sx={{ fontSize: 25, height: 55 }}
                  disabled={
                    currentPorduct.quantity + 1 >
                      Number(TargetProduct?.quantity) &&
                    GetUserData()?.role == 'branch'
                  }
                  onClick={() => {
                    setCurrentProduct({
                      ...currentPorduct,
                      quantity: currentPorduct.quantity + 1,
                    });
                  }}
                >
                  <AddIcon />
                </Button>

                {/* <Slider
                  value={currentPorduct?.quantity || 0}
                  onChange={(e, val) => {
                    setCurrentProduct({
                      ...currentPorduct,
                      quantity: Number(val),
                    });
                  }}
                  aria-label="Default"
                  max={
                    GetUserData()?.role == 'branch'
                      ? Number(TargetProduct?.quantity) || 0
                      : 1000
                  }
                  valueLabelDisplay="auto"
                /> */}
              </div>
            )}
            <ErrorMessage
              name="quantity"
              component={'div'}
              className=" error-msg"
            />
            <ErrorMessage name="id" component={'div'} className=" error-msg" />
            <Button type="submit" className=" w-full">
              {t('add')}
            </Button>
            {ProductList?.length == 0 ||
              (ProductList?.every((item) => Number(item.quantity) == 0) &&
                GetUserData()?.role !== 'supplier' && (
                  <div className=" text-red-500">
                    Es scheint, dass es keine Produkte gibt, die Sie nehmen
                    können! Bei Problemen wenden Sie sich bitte an den
                    Administrator.
                  </div>
                ))}
          </div>
        </Form>
      </Formik>
      <span className=" md:hidden block">
        <Divider />
      </span>
      <div className=" flex flex-col gap-5">
        <h2 className=" text-xl md:text-3xl">Ihre ausgewählten Produkte</h2>
        {selectedProducts?.length == 0 && (
          <div className=" text-center text-5xl text-gray-500">...</div>
        )}
        {selectedProducts.map((item, index) => {
          return (
            <Card
              key={index}
              className=" p-3 flex items-center justify-between flex-wrap"
              sx={{ borderRadius: '9px' }}
            >
              <div className=" flex items-center gap-3">
                <FoodBankIcon />
                <h1 className=" text-xl">
                  {ProductList?.find((pro) => item.id == pro.id)?.name}
                </h1>
              </div>
              <div className=" flex items-center gap-3">
                <NumbersIcon />
                <p>{item.quantity}</p>
              </div>
              <div>
                <IconButton onClick={() => deleteItem(index)}>
                  <HighlightOffIcon color="error" />
                </IconButton>
              </div>
            </Card>
          );
        })}
        {selectedProducts?.length > 0 && (
          <Button onClick={createProcess} disabled={isPending}>
            {t('save')}
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProcessesPage;
