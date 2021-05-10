import { observer } from "mobx-react-lite";
import React, { Fragment, useEffect, useState } from "react";
import { Header } from "semantic-ui-react";
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
    <>

      {
        Array.from(activityStore.activitiesGroupedByDate.entries()).map(([date, activities]) => (<Fragment key={date}>
          <Header sub color='teal'>{date}</Header>
          {
            activities.map((activity) => (
              <ActivityListItem activity={activity} key={activity.id} />
            ))
          }
        </Fragment>))
      }
    </>
  );
}

export default observer(ActivityList);