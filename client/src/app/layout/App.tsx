import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivitiesDashboard from '../../features/activities/dashboard/ActivitiesDashboard';
import {v4 as uuid} from 'uuid'

function App() {
  let [activities, setActivities] = useState<Activity[]>([]);
  let [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  let [editMode, setEditMode] = useState(false);

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
    setActivities(activity.id ? [...activities.filter(x => x.id !== activity.id), activity]
      : [...activities, {...activity, id: uuid()}]);

    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter(x => x.id !== id)]);
  }

  useEffect(() => {
    axios.get<Activity[]>("https://localhost:5001/api/Activities").then(response => {
      console.log(response);
      setActivities(response.data);
    });
  }, []);

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
          deleteActivity={handleDeleteActivity}/>
      </Container>
    </>
  );
}

export default App;
