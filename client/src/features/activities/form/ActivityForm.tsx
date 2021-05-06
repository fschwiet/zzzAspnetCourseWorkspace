import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react"
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../stores/store";

function ActivityForm() {

  var {activityStore} = useStore();

  const initialState = activityStore.selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
    isCancelled: false
  };

  const [activity, setActivity] = useState(initialState);

  function handleSubmit() {
    console.log(activity);
    activityStore.createOrEditActivity(activity);
  };

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = event.target;
    setActivity({...activity, [name]: value});
  };

  // bugbug: if a new activity is clicked while editing form is already open
  // the form is not reset.

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleInputChange} />
        <Form.TextArea placeholder="Description" value={activity.description} name="description" onChange={handleInputChange} />
        <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleInputChange} />
        <Form.Input type="date" placeholder="Date" value={activity.date} name="date" onChange={handleInputChange} />
        <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleInputChange} />
        <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handleInputChange} />
        <Button loading={activityStore.loading} floated="right" positive type="submit" content="Submit" />
        <Button onClick={() => activityStore.clearEdit} floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
}

export default observer(ActivityForm);