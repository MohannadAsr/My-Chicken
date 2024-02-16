import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from '@mui/material';
import { ErrorMessage, Field, FieldProps } from 'formik';

export interface FormikRadioGroupProps extends RadioGroupProps {
  name: string;
  label: string;
  radios: { title: string; value: any }[];
  Fn?: (props: any) => any;
}

function FormikRadioGroup({
  name,
  label,
  radios,
  Fn,
  ...rest
}: FormikRadioGroupProps) {
  return (
    <>
      <Field name="gender">
        {({ field, form }: FieldProps) => (
          <FormControl>
            <RadioGroup
              value={form.values[name]}
              onChange={(e, value) => {
                form.setFieldValue(name, value);
              }}
              {...rest}
              name={name}
              id={name}
            >
              {radios?.map((radio, index) => {
                return (
                  <FormControlLabel
                    key={radio.value}
                    value={radio?.value}
                    control={
                      <Radio
                        color={
                          rest?.color == 'primary' || rest?.color == 'secondary'
                            ? rest?.color
                            : 'primary'
                        }
                      />
                    }
                    label={radio?.title}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        )}
      </Field>
      <ErrorMessage name={name} component={'div'} className="error-msg" />
    </>
  );
}

export default FormikRadioGroup;
