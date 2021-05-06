import React from "react"
import { observer } from "mobx-react-lite";
import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../stores/store";

function ActivityDetails() {

  var {activityStore} = useStore();

  var activity = activityStore.SelectedActivity;
  
  if (!activity) return <Card></Card>

  return (
    <Card fluid>
      <Image src={`./assets/categoryImages/${activity.category}.jpg`} />
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
        <Button basic onClick={() => activityStore.setEditSelected()} color="blue" content="Edit"/>
        <Button basic onClick={() => activityStore.clearSelectedActivity()} color="grey" content="Cancel"/>
        </Button.Group>
      </Card.Content>
    </Card>
  );
}

export default observer(ActivityDetails);