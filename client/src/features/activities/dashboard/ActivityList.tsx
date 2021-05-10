import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Item, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../stores/store";
import ActivityListItem from "./ActivityListItem";

function ActivityList() {

  const { activityStore } = useStore();
  var [loading, setLoading] = useState(true);

  useEffect(() => {
    activityStore.ensureActivitiesLoaded().then(() => setLoading(false));
  }, [activityStore]);

  if (loading)
    return <LoadingComponent content="Loading app"></LoadingComponent>

  return (
    <Segment>
      <Item.Group divided>
        {
          activityStore.activitiesByDate.map((activity) => (
            <ActivityListItem activity={activity} key={activity.id} />
          ))
        }
      </Item.Group>
    </Segment>
  );
}

export default observer(ActivityList);