import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';

function App() {
  let [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>("https://localhost:5001/api/Activities").then(response => {
      console.log(response);
      setActivities(response.data);
    });
  }, []);

  return (
    <div>
      <Header as="h2" icon="users" content="This is a header."></Header>
      <List>
        {
          activities.map((activity) =>
            <List.Item key={activity.id}>{activity.title}</List.Item>)
        }
      </List>
    </div>
  );
}

export default App;
