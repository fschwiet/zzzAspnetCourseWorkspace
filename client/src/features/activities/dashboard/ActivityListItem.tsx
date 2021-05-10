import { observer } from 'mobx-react-lite';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
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
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size='tiny' circular src='/assets/user.png' />
              <Item.Content>
                <Item.Header as={Link} to={`/activities/${activity.id}`}>{activity.title}</Item.Header>
                <Item.Description>Hosted by Bob</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name='clock' /> {activity.date}
            <Icon name='marker' /> {activity.venue}
          </span>
        </Segment>
        <Segment secondary>Attendees go here</Segment>
        <Segment clearing>
          <span>{activity.description}</span>
          <Button as={Link} to={`/activities/${activity.id}`} floated='right' color='teal' content='view' />
          <Button onClick={(e) => handleDelete()} name={activity.id} loading={loading} floated="right" content="Delete" color="red" />
          <Label basic content={activity.category} />
        </Segment>
      </Segment.Group>
    </>
  )
}

export default observer(ActivityListItem)