import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik'
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Button, Header, Label } from 'semantic-ui-react'
import { routedHistory } from '../..';
import MyTextInput from '../../app/common/form/MyTextInput'
import { useStore } from '../../stores/store';

interface Props {
  onDone: () => void
}

interface FormikFields {
  email: string;
  password: string;
  error: string | null
}

export default observer(function LoginForm({ onDone }: Props) {

  const { userStore } = useStore();

  async function handleSubmit(values: FormikFields, { setErrors }: FormikHelpers<FormikFields>) {
    try {
      await userStore.login(values)
      routedHistory.push('/activities')
      onDone();
    } catch {
      setErrors({ error: 'Login failed' });
    }
  }

  return (
    <Formik<FormikFields>
      initialValues={{ email: '', password: '', error: 'null' }}
      onSubmit={handleSubmit}>

      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
          <Header as='h2' content='Login to Reactivities' color='teal' textAlign='center'/>
          <MyTextInput name='email' placeholder='Email' />
          <MyTextInput name='password' placeholder='Password' type='password' />
          <ErrorMessage name='error' render={() => <Label content={errors.error} style={{ marginBottom: 10 }} basic color='red' />} />
          <Button loading={isSubmitting} positive content='Login' type='submit' fluid />
        </Form>
      )}
    </Formik>
  )
})