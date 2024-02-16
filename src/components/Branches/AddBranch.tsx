import DashDialog from '@components/shared/Dialog/DashDialog';
import FormikControl from '@components/shared/Formik/FormikControl';
import AddIcon from '@mui/icons-material/Add';
import { Button, Checkbox, DialogActions } from '@mui/material';
import { MutateAddUser } from '@src/hooks/Queries/Users/useUsersQuery';
import { ErrorButton, gradientBackGround } from '@src/styles/globalMuiStyls';
import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

class InitValue {
  name = '' as string;
  code = '' as string;
  role = 'branch' as 'branch';
}

function AddBranch() {
  const { t } = useTranslation();
  const { mutate, isPending } = MutateAddUser();
  const [multipile, setMultiple] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const validationSchema = yup.object({
    name: yup.string().required('This Feild is required'),
    code: yup.string().min(5).max(5).required('This Feild is required'),
    role: yup.string().required('This Feild is required'),
  });
  const [initVal, setInitVal] = React.useState<InitValue>(new InitValue());

  const handleClose = () => {
    setInitVal(new InitValue());
    if (!multipile) setOpen(false);
  };

  const submit = async (
    values: InitValue,
    helper: FormikHelpers<InitValue>
  ) => {
    mutate(
      { ...values },
      {
        onSuccess: () => {
          handleClose();
          helper.resetForm();
        },
      }
    );
  };

  return (
    <div>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        onClick={() => setOpen(true)}
      >
        {/* Add New Branch */}
        Neuen Filiale hinzufügen
      </Button>

      <DashDialog
        open={open}
        handleClose={handleClose}
        title={'Erstellen Sie einen neuen Filiale'}
        body={
          <>
            <Formik
              initialValues={initVal}
              enableReinitialize
              onSubmit={submit}
              validationSchema={validationSchema}
            >
              <Form>
                <div className=" flex flex-col gap-3">
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
                  <div className=" flex items-center gap-3">
                    <Checkbox
                      checked={multipile}
                      onChange={(e, val) => {
                        setMultiple(val);
                      }}
                    />
                    <p>Fügen Sie mehrere Filiale hinzu</p>
                  </div>
                  <DialogActions>
                    <ErrorButton
                      onClick={() => setOpen(false)}
                      variant="contained"
                    >
                      {t('close')}
                    </ErrorButton>
                    <Button
                      disabled={isPending}
                      type="submit"
                      endIcon={<AddIcon />}
                      variant="contained"
                    >
                      {t('add')}
                    </Button>
                  </DialogActions>
                </div>
              </Form>
            </Formik>
          </>
        }
      />
    </div>
  );
}

export default AddBranch;
