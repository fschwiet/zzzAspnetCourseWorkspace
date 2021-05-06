import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivitiesDashboard from '../../features/activities/dashboard/ActivitiesDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  let {activityStore} = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading app"></LoadingComponent> 

  return (
    <>
      <NavBar/>
      <Container style={{ marginTop: '7em' }}>
        <ActivitiesDashboard/>
      </Container>
    </>
  );
}

export default observer(App);
