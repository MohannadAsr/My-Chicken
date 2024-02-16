import React from 'react';

import StorefrontIcon from '@mui/icons-material/Storefront';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MutateDeleteUsers,
  MutateUpdateUser,
  fetchUsersList,
} from '@src/hooks/Queries/Users/useUsersQuery';
import { Form, Formik } from 'formik';
import FormikControl from '@components/shared/Formik/FormikControl';
import { Button, Divider } from '@mui/material';
import * as yup from 'yup';
import ProcessTable from '@components/Processes/ProcessTable';
import { filterOptionsDto } from '@src/Api/Processes/Dto';
import { ErrorButton } from '@src/styles/globalMuiStyls';
import BarChartIcon from '@mui/icons-material/BarChart';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { useTranslation } from 'react-i18next';

class formType {
  name = '' as string;
  code = '' as string;
}

function BranchDetails() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data } = fetchUsersList();
  const [formValue, setFormValue] = React.useState<formType>(new formType());
  const { mutate: update } = MutateUpdateUser();
  const { mutate: deleteuser } = MutateDeleteUsers();

  const SelectedItem = React.useMemo(() => {
    return data?.find((item) => item.id == id);
  }, [id, data]);

  const validationSchema = yup.object({
    name: yup.string().required('This Feild is required'),
    code: yup.string().min(5).max(5).required('This Feild is required'),
  });

  React.useEffect(() => {
    setFormValue({
      name: SelectedItem?.name || '',
      code: SelectedItem?.code || '',
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
    deleteuser([id], {
      onSuccess: () => {
        navigate(-1);
      },
    });
  };

  return (
    <div className=" flex flex-col gap-5">
      <div className=" flex gap-3 items-center">
        {SelectedItem?.role == 'branch' ? (
          <StorefrontIcon />
        ) : (
          <PrecisionManufacturingIcon />
        )}
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
                label="Code"
                name="code"
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
          Von diesem {t(SelectedItem?.role)} verarbeitete Berichte
        </h2>
      </div>
      <ProcessTable
        filterOptions={{ ...new filterOptionsDto(), handlerId: id }}
      />
    </div>
  );
}

export default BranchDetails;
