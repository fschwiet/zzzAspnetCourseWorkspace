import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

function ActivityDashboard() {

  const { activityStore } = useStore();

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        {activityStore.selectedActivity &&
          <ActivityDetails />
        }
        {activityStore.editMode && <ActivityForm
        />}
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityDashboard);