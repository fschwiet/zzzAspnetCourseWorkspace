import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivitiesDashboard from '../../features/activities/dashboard/ActivitiesDashboard';
import {v4 as uuid} from 'uuid'
import Agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import agent from '../api/agent';

function App() {
  let [activities, setActivities] = useState<Activity[]>([]);
  let [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  let [editMode, setEditMode] = useState(false);
  let [loading, setLoading] = useState(true);
  let [submitting, setSubmitting] = useState(false);

  function handleSelectActivity(id: string) {
    setEditMode(false);
    setSelectedActivity(activities.find(x => x.id === id))
  }

  function handleCancelSelectActivity() {
    setEditMode(false);
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);

    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      });
    } else
    {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      });
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    });
  }

  useEffect(() => {
    Agent.Activities.list().then(response => {
      setActivities(response);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingComponent content="Loading app"></LoadingComponent> 

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivitiesDashboard activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose} 
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}/>
      </Container>
    </>
  );
}

export default App;
