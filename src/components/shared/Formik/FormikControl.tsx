import React from 'react';
import FormikTextField from './FormikFields/FormikTextField';
import { RadioGroupProps, TextFieldProps } from '@mui/material';
import FormikRadioGroup, {
  FormikRadioGroupProps,
} from './FormikFields/FormikRadioGroup';

export type FormikControlType =
  | ({
      Fieldtype: 'textField';
      name: string;
      label: any;
      radios?: null;
      Fn?: (props: any) => any;
    } & TextFieldProps)
  | ({
      Fieldtype: 'radio';
      name: string;
      label?: any;
      radios?: { title: string; value: any }[];
      Fn?: (props: any) => any;
    } & FormikRadioGroupProps);

function FormikControl({
  Fieldtype,
  name,
  label,
  radios,
  Fn,
  ...rest
}: FormikControlType) {
  switch (Fieldtype) {
    case 'textField':
      return (
        <FormikTextField
          name={name}
          label={label}
          {...(rest as TextFieldProps)}
          Fn={Fn}
        />
      );
    case 'radio':
      return (
        <FormikRadioGroup
          name={name}
          label={label}
          {...(rest as FormikRadioGroupProps)}
          radios={radios}
          Fn={Fn}
        />
      );
    default:
      return null;
  }
}

export default FormikControl;
