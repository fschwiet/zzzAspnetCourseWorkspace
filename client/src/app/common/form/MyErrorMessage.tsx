import { useField } from 'formik';
import React from 'react'
import { Form, Label } from 'semantic-ui-react';

interface Props {
  name: string;
}
export default function MyErrorMessage(props: Props) {
  const [field, meta] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      {meta.touched && meta.error && <Label color='red'>{meta.error}</Label>}
    </Form.Field>
  )
}