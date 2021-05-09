import React from "react";
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";

function ActivityDashboard() {

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        <h2>Activity filter</h2>
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityDashboard);