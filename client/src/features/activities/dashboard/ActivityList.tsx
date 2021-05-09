import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../stores/store";

function ActivityList() {

  const {activityStore} = useStore();
  var [target, setTarget] = useState<string>();
  var [loading, setLoading] = useState(true);

  useEffect(() => {
    activityStore.ensureActivitiesLoaded().then(() => setLoading(false));
  }, [activityStore]);

  if (loading) 
    return <LoadingComponent content="Loading app"></LoadingComponent> 

  function handleDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    activityStore.deleteActivity(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {
          activityStore.activitiesByDate.map((activity) => (
            <Item key={activity.id}>
              <Item.Content>
                <Item.Header as="a">{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                  <div>{activity.description}</div>
                  <div>{activity.city}, {activity.venue}</div>
                </Item.Description>
                <Item.Extra>
                <Button as={Link} to={`/activities/${activity.id}`} floated="right" content="View" color="blue" />
                <Button onClick={(e) => handleDelete(e, activity.id)} name={activity.id} loading={(target === activity.id) && activityStore.loading} floated="right" content="Delete" color="red" />
                  <Label basic content={activity.category} />
                </Item.Extra>
              </Item.Content>
            </Item>
          ))
        }
      </Item.Group>
    </Segment>
  );
}

export default observer(ActivityList);