import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../stores/store";

function ActivityForm() {

  var { id } = useParams<{ id: string }>();
  var { activityStore } = useStore();

  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
    isCancelled: false
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

  function handleSubmit() {
    console.log(activity);
    activityStore.createOrEditActivity(activity).then(id => {
      history.push(`/activities/${id}`)
    });
  };

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
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
        <Button as={Link} to={activity.id ? `/activities/${activity.id}` : '/activities'} floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
}

export default observer(ActivityForm);