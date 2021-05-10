import { observer } from 'mobx-react-lite';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Item, Label } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../stores/store';

interface Props {
  activity: Activity
}

function ActivityListItem({ activity }: Props) {
  const { activityStore } = useStore();
  const [loading, setLoading] = useState(false);

  function handleDelete() {
    setLoading(true)
    activityStore.deleteActivity(activity.id).then(() => setLoading(false));
  }

  return (
    <>
      <Item>
        <Item.Content>
          <Item.Header as="a">{activity.title}</Item.Header>
          <Item.Meta>{activity.date}</Item.Meta>
          <Item.Description>
            <div>{activity.description}</div>
            <div>{activity.city}, {activity.venue}</div>
          </Item.Description>
          <Item.Extra>
            <Button as={Link} to={`/activities/${activity.id}`} floated="right" content="View" color="blue" />
            <Button onClick={(e) => handleDelete()} name={activity.id} loading={loading} floated="right" content="Delete" color="red" />
            <Label basic content={activity.category} />
          </Item.Extra>
        </Item.Content>
      </Item>
    </>
  )
}

export default observer(ActivityListItem)