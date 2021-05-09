import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite";
import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Link, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";

function ActivityDetails() {

  var { id } = useParams<{ id: string }>();
  var { activityStore } = useStore();
  var [activity, setActivity] = useState<Activity>();
  var [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) 
    {
      setLoading(false);
    }
    else
    {
      activityStore.loadActivity(id).then(setActivity).then(() => setLoading(false));
    }
  }, [id, activityStore]);

  if (loading || !activity)
    return <LoadingComponent content="Loading activity"></LoadingComponent>

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button basic as={Link} to={`/manage/${activity.id}`} color="blue" content="Edit" />
          <Button basic as={Link} to='/activities' color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}

export default observer(ActivityDetails);