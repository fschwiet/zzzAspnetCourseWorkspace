import { useField } from 'formik';
import React from 'react'
import { Form, Label, Select } from 'semantic-ui-react';

interface Props {
  placeholder: string;
  name: string;
  options: {text: string, value: string}[];
  label?: string;
}

export default function MySelectInput(props: Props) {
  const [field, meta, helpers] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <Select clearable options={props.options} 
        value={field.value}
        onChange={(elem, eve) => helpers.setValue(eve.value)}
        onBlur={() => helpers.setTouched(true)}
        ></Select>
      {meta.touched && meta.error && <Label color='red'>{meta.error}</Label>}
    </Form.Field>
  )
}