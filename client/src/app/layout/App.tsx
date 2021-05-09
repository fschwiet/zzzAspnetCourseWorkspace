import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivitiesDashboard from '../../features/activities/dashboard/ActivitiesDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import ActivityForm from '../../features/activities/form/ActivityForm';
import HomePage from '../../features/home/HomePage';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {
  const location = useLocation();

  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route>
        <NavBar />
        <Container style={{ marginTop: '7em' }}>
          <Route exact path='/activities' component={ActivitiesDashboard} />
          <Route path='/activities/:id' component={ActivityDetails} />
          <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
        </Container>
      </Route>
    </Switch>
  );
}

export default observer(App);
