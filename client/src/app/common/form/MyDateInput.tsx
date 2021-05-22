import { useField } from 'formik';
import React from 'react'
import { Form, Label } from 'semantic-ui-react';
import DatePicker, {ReactDatePickerProps} from 'react-datepicker'

interface Props extends Partial<ReactDatePickerProps> {
  name: string,
}


export default function MyDateInput(props: Props) {
  const [field, meta, helpers] = useField(props.name);
  return (
    // couldn't limit error={meta.touched && ...} because touched was false when clearing a date value from the edit screen
    <Form.Field error={!!meta.error}>
      <DatePicker {...field} {...props} 
        selected={(field.value && new Date(field.value)) || null} 
        onChange={value => helpers.setValue(value) }
        />
      {meta.error && <Label color='red'>{meta.error}</Label>}
    </Form.Field>
  )
}