import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivitiesDashboard from '../../features/activities/dashboard/ActivitiesDashboard';

function App() {
  let [activities, setActivities] = useState<Activity[]>([]);
  let [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  //let [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id))
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  useEffect(() => {
    axios.get<Activity[]>("https://localhost:5001/api/Activities").then(response => {
      console.log(response);
      setActivities(response.data);
    });
  }, []);

  return (
    <>
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
        <ActivitiesDashboard activities={activities} 
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}/>
      </Container>
    </>
  );
}

export default App;
