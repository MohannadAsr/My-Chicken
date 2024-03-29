import FoodBankIcon from '@mui/icons-material/FoodBank';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import NumbersIcon from '@mui/icons-material/Numbers';
import {
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
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { userDto } from '@src/Api/Users/Dto';
import {
  MutateCreateProcess,
  fetchProccessById,
} from '@src/hooks/Queries/Processes/useProcessesQuery';
import { fetchProductsList } from '@src/hooks/Queries/Products/userProductsQuery';
import { fetchUsersList } from '@src/hooks/Queries/Users/useUsersQuery';
import { ErrorButton } from '@src/styles/globalMuiStyls';
import { ErrorMessage, Form, Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function AddAdminProcess() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data: ProductList } = fetchProductsList();
  const { data: usersList } = fetchUsersList();
  const [handler, setHandler] = React.useState<null | userDto>(null);
  const [date, setDate] = React.useState<null | Date>(null);
  const { mutate, isPending } = MutateCreateProcess();
  const [selectedProducts, SetSelectedProducts] = React.useState<
    { id: string; quantity: number }[]
  >([]);
  // const { GetUserData } = useAuth();

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
        handlerId: handler?.id,
        createdAt: date !== null ? date : null,
        productsList: selectedProducts.map((item) => {
          return {
            ...item,
            productName: ProductList?.find((prod) => prod.id == item.id)?.name,
            quantity:
              handler?.role == 'branch' ? item.quantity * -1 : item.quantity,
          };
        }),
      },
      {
        onSuccess: () => {
          SetSelectedProducts([]);
        },
      }
    );
  };

  return (
    <>
      <div className=" my-3">
        <div className=" grid grid-cols-1 md:grid-cols-2  gap-4 items-center">
          <div>
            <InputLabel id="demo-simple-select-label">
              {t('handler')}
            </InputLabel>
            <Select
              placeholder="Please Select a Product"
              className=" w-full"
              label={t('handler')}
              disabled={selectedProducts?.length > 0}
              value={handler ? handler.id : ''} // Ensure a string value for the Select component
              onChange={(e) => {
                const target = usersList.find(
                  (item) => item.id === e.target.value
                );
                setCurrentProduct({
                  ...currentPorduct,
                  quantity: 0,
                });
                setHandler({ ...target } || null);
              }}
            >
              {usersList
                ?.filter((item) => item?.role !== 'admin')
                .map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name} - {[item?.role]}
                  </MenuItem>
                ))}
            </Select>
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <InputLabel id="demo-simple-select-label">
                {t('data&Time')}
              </InputLabel>
              <DateTimePicker
                onChange={(val: Date) => {
                  setDate(val);
                }}
                ampm={false}
                closeOnSelect={false}
                className=" w-full"
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>
      <div className=" my-6">
        <Divider />
      </div>
      {handler && (
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 px-3">
          <Formik
            onSubmit={submit}
            validationSchema={ValidationSchema}
            initialValues={currentPorduct}
            enableReinitialize
          >
            <Form>
              <div className=" flex flex-col gap-4">
                <h2 className=" text-xl md:text-3xl">
                  Neues Produkt hinzufügen
                </h2>

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
                        handler.role == 'branch') ||
                        handler.role == 'supplier')
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
                            handler?.role !== 'branch'
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
                        handler.role == 'branch'
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
                        handler?.role == 'branch'
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
                <ErrorMessage
                  name="id"
                  component={'div'}
                  className=" error-msg"
                />
                <Button type="submit" className=" w-full">
                  {t('add')}
                </Button>
                {ProductList?.length == 0 ||
                  (ProductList?.every((item) => Number(item.quantity) == 0) &&
                    handler?.role !== 'supplier' && (
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
      )}
    </>
  );
}

export default AddAdminProcess;
