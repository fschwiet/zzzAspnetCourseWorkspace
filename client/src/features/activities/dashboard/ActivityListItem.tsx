import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../stores/store';
import ActivityListItemAttendee from './ActivityListItemAttendee';

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
          {activity.isCancelled &&
            <Label attached='top' color='red' style={{ textAlign: 'center' }}>Cancelled</Label>
          }
          <Item.Group>
            <Item>
              <Item.Image size='tiny' style={{ marginBottom: 3 }} circular src='/assets/user.png' />
              <Item.Content>
                <Item.Header as={Link} to={`/activities/${activity.id}`}>{activity.title}</Item.Header>
                <Item.Description>Hosted by {activity.host.displayName}</Item.Description>
                {activity.isHost && (
                  <Item.Description>
                    <Label basic color='orange'>
                      You are hosting this activity.
                    </Label>
                  </Item.Description>
                )}
                {activity.isGoing && !activity.isHost && (
                  <Item.Description>
                    <Label basic color='green'>
                      You are going to this activity.
                    </Label>
                  </Item.Description>
                )}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name='clock' /> {format(activity.date, 'dd MMM yyyy h:mm aa')}
            <Icon name='marker' /> {activity.venue}
          </span>
        </Segment>
        <Segment secondary>
          <ActivityListItemAttendee attendees={activity.attendees} />
        </Segment>
        <Segment clearing>
          <span>{activity.description}</span>
          <Button as={Link} to={`/activities/${activity.id}`} floated='right' color='teal' content='view' />
          {activity.isHost &&
            <Button onClick={(e) => handleDelete()} name={activity.id} loading={loading} floated="right" content="Delete" color="red" />
          }

          <Label basic content={activity.category} />
        </Segment>
      </Segment.Group>
    </>
  )
}

export default observer(ActivityListItem)