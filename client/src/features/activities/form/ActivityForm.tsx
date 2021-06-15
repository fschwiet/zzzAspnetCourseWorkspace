import React, { useEffect, useState } from "react"
import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Activity, ActivityFormFields } from "../../../app/models/activity";
import { useStore } from "../../../stores/store";
import * as Yup from 'yup'
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/models/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

function ActivityForm() {

  var { id } = useParams<{ id: string }>();
  var { activityStore } = useStore();

  const [activity, setActivity] = useState<ActivityFormFields>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: null!,
    city: '',
    venue: ''
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('The activity title is required.'),
    description: Yup.string().required('The activity description is required.'),
    category: Yup.string().required(),
    date: Yup.date().required("Date is required."),
    city: Yup.string().required(),
    venue: Yup.string().required(),
  });

  const [loading, setLoading] = useState(!!id);

  const history = useHistory();

  useEffect(() => {
    if (id) {
      activityStore.loadActivity(id).then(a => {
        if (a) setActivity(a)

        setLoading(false)
      });
    }
  }, [id, activityStore]);

  if (id && !activity)
    return <LoadingComponent content="Loading activity"></LoadingComponent>

  if (loading)
    return <LoadingComponent content="Loading activity"></LoadingComponent>

  function handleFormSubmit(activity: ActivityFormFields) {
    activityStore.createOrEditActivity(activity).then(id => {
      history.push(`/activities/${id}`)
    });
  };

  // bugbug: if a new activity is clicked while editing form is already open
  // the form is not reset.

  return (
    <Segment clearing>
      <Header content='Activity Details' sub color='teal' />
      <Formik initialValues={activity} onSubmit={handleFormSubmit} validationSchema={validationSchema} enableReinitialize>
        {({ isValid, isSubmitting, dirty }) => (
          <Form className='ui form' autoComplete='off'>
            <MyTextInput placeholder="Title" name="title" />
            <MyTextArea placeholder="Description" name="description" rows={3} />
            <MySelectInput placeholder="Category" name="category" options={categoryOptions} />
            <MyDateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm aa' />

            <Header content='Location Details' sub color='teal' />
            <MyTextInput placeholder="City" name="city" />
            <MyTextInput placeholder="Venue" name="venue" />
            <Button
              disabled={isSubmitting || !isValid || !dirty}
              loading={isSubmitting}
              floated="right"
              positive type="submit" content="Submit" />
            <Button as={Link} to={activity.id ? `/activities/${activity.id}` : '/activities'} floated="right" type="button" content="Cancel" />
          </Form>
        )}

      </Formik>
    </Segment>
  );

  /*
        <Form onSubmit={handleSubmit}>
        <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleInputChange} />
        <Form.TextArea placeholder="Description" value={activity.description} name="description" onChange={handleInputChange} />
        <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleInputChange} />
        <Form.Input type="date" placeholder="Date" value={activity.date} name="date" onChange={handleInputChange} />
        <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleInputChange} />
        <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handleInputChange} />
        <Button loading={activityStore.loading} floated="right" positive type="submit" content="Submit" />
        <Button as={Link} to={activity.id ? `/activities/${activity.id}` : '/activities'} floated="right" type="button" content="Cancel" />
      </Form>
      */
}

export default observer(ActivityForm);