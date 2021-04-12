import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  let [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:5001/api/Activities").then(response => {
      console.log(response);
      setActivities(response.data);
    });
  }, []);

  return (
    <div>
      <Header as="h2" icon="users" content="This is a header."></Header>
      <List>
        {
          activities.map((activity : any) =>
            <List.Item key={activity.id}>{activity.title}</List.Item>)
        }
      </List>
    </div>
  );
}

export default App;
