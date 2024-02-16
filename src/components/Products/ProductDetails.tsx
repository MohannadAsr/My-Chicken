import ProcessTable from '@components/Processes/ProcessTable';
import FormikControl from '@components/shared/Formik/FormikControl';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Button, Divider } from '@mui/material';
import { filterOptionsDto } from '@src/Api/Processes/Dto';
import {
  MutateDeleteProducts,
  MutateUpdateProduct,
  fetchProductsList,
} from '@src/hooks/Queries/Products/userProductsQuery';
import { ErrorButton } from '@src/styles/globalMuiStyls';
import { Form, Formik } from 'formik';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useTranslation } from 'react-i18next';

class formType {
  name = '' as string;
  quantity = 0 as number;
}

function ProductDetails() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data } = fetchProductsList();
  const [formValue, setFormValue] = React.useState<formType>(new formType());
  const { mutate: update } = MutateUpdateProduct();
  const { mutate: deleteProduct } = MutateDeleteProducts();

  const SelectedItem = React.useMemo(() => {
    return data?.find((item) => item.id == id);
  }, [id, data]);

  const validationSchema = yup.object({
    name: yup.string().required('This Feild is required'),
    quantity: yup.number().positive().required('This Feild is required'),
  });

  React.useEffect(() => {
    setFormValue({
      name: SelectedItem?.name || '',
      quantity: Number(SelectedItem?.quantity) || 0,
    });
  }, [SelectedItem]);

  const submit = (values: formType) => {
    update(
      { ...values, id },
      {
        onSuccess: () => {
          navigate(-1);
        },
      }
    );
  };

  const deleteBranches = () => {
    deleteProduct([id], {
      onSuccess: () => {
        navigate(-1);
      },
    });
  };

  return (
    <div className=" flex flex-col gap-5">
      <div className=" flex gap-3 items-center">
        <FastfoodIcon />

        <p className=" text-xl font-bold">{SelectedItem?.name}</p>
      </div>
      <div>
        <Formik
          onSubmit={submit}
          initialValues={formValue}
          enableReinitialize
          validationSchema={validationSchema}
        >
          <Form>
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 my-5">
              <FormikControl
                Fieldtype="textField"
                label="Name"
                name="name"
                className=" w-full"
              />
              <FormikControl
                Fieldtype="textField"
                label={t('quantity')}
                name="quantity"
                className=" w-full"
              />
            </div>
            <div className=" flex items-center gap-4">
              <Button type="submit">{t('update')}</Button>
              <ErrorButton onClick={deleteBranches}>{t('delete')}</ErrorButton>
            </div>
          </Form>
        </Formik>
      </div>
      <div className=" my-5">
        <Divider />
      </div>
      <div className=" flex gap-2 items-center">
        <BarChartIcon />
        <h2
          className=" 
          text-xl font-bold"
        >
          Berichte enthalten dieses Produkt
        </h2>
      </div>
      <ProcessTable
        filterOptions={{
          ...new filterOptionsDto(),
          productId: [id],
        }}
      />
    </div>
  );
}

export default ProductDetails;
