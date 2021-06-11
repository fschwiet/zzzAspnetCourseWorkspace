import { Form, Formik, FormikHelpers } from 'formik'
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Button, Header } from 'semantic-ui-react'
import { routedHistory } from '../..';
import MyTextInput from '../../app/common/form/MyTextInput'
import { useStore } from '../../stores/store';
import * as Yup from 'yup'
import MyErrorMessage from '../../app/common/form/MyErrorMessage';

interface Props {
  onDone: () => void
}

interface FormikFields {
  displayName: string;
  username: string;
  email: string;
  password: string;
  error: string | null
}

export default observer(function RegisterForm({ onDone }: Props) {

  const { userStore } = useStore();

  async function handleSubmit(values: FormikFields, { setErrors }: FormikHelpers<FormikFields>) {
    try {
      await userStore.register(values)
      routedHistory.push('/activities')
      onDone();
    } catch(errors) {
      console.log(errors);
      setErrors({error: errors[0]});
    }
  }

  return (
    <Formik<FormikFields>
      initialValues={{ displayName: '', username: '', email: '', password: '', error: null }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      })}
      onSubmit={handleSubmit}>

      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
          <Header as='h2' content='Create an Account' color='teal' textAlign='center' />
          <MyTextInput name='displayName' placeholder='Display Name' />
          <MyTextInput name='username' placeholder='Username' />
          <MyTextInput name='email' placeholder='Email' />
          <MyTextInput name='password' placeholder='Password' type='password' />
          <MyErrorMessage name='error'/>
          <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content='Register' type='submit' fluid />
        </Form>
      )}
    </Formik>
  )
})