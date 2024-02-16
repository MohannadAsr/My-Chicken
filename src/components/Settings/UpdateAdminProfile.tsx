import React from 'react';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Form, Formik } from 'formik';
import FormikControl from '@components/shared/Formik/FormikControl';
import * as yup from 'yup';
import {
  MutateUpdateUser,
  fetchUsersList,
} from '@src/hooks/Queries/Users/useUsersQuery';
import { Button } from '@mui/material';
import { useAuth } from '@src/hooks/useAuth';
import { t } from 'i18next';

function UpdateAdminProfile() {
  const [admin, setAdmin] = React.useState({ name: '', code: '', id: '' });
  const { GetUserData, SetuserData } = useAuth();
  const { mutate, isPending } = MutateUpdateUser();
  const { data } = fetchUsersList();
  const validationSchema = yup.object({
    name: yup.string().required('This Feild is required'),
    code: yup.string().min(5).max(5).required('This Feild is required'),
  });

  React.useEffect(() => {
    const admin = data?.find((item) => item.role == 'admin');
    setAdmin({
      name: admin?.name || '',
      code: admin?.code || '',
      id: admin?.id || '',
    });
  }, [data]);

  const submit = (values) => {
    mutate(values, {
      onSuccess: (data) => {
        SetuserData({ ...GetUserData(), name: data.name });
      },
    });
  };

  return (
    <div>
      <div className=" flex items-center gap-3">
        <AdminPanelSettingsIcon fontSize="large" />
        <h2 className=" text-lg md:text-xl font-bold">{t('adminUpdate')}</h2>
      </div>
      <p>{t('adminUpdateDesc')}</p>
      <div className=" my-4 ">
        <Formik
          initialValues={admin}
          onSubmit={submit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          <Form>
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-3">
              <FormikControl
                Fieldtype="textField"
                type="text"
                label="name"
                name="name"
                className=" w-full"
              />
              <FormikControl
                Fieldtype="textField"
                type="text"
                label="code"
                name="code"
                className=" w-full"
              />
            </div>
            <div className=" my-3">
              <Button type="submit" disabled={isPending}>
                {' '}
                {t('update')}
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default UpdateAdminProfile;
