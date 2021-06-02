import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Menu, Image, Dropdown } from "semantic-ui-react";
import { routedHistory } from "../..";
import { useStore } from "../../stores/store";

export default observer(function NavBar() {

  const { userStore: { user, logout } } = useStore();

  function handleLogout() {
    logout();
    routedHistory.push('/')
  }

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header as={NavLink} to="/" exact>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    Reactivities
                </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to="/activities" />
        <Menu.Item name="Errors" as={NavLink} to="/errors" />
        <Menu.Item name="Swagger" href="http://localhost:5000/swagger/index.html" />
        <Menu.Item>
          <Button positive content="Create Activity" as={NavLink} to="/createActivity" />
        </Menu.Item>
        <Menu.Item position='right'>
          <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
          <Dropdown text={user?.displayName} pointing='top left'>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text='My Profile' icon='user' />
              <Dropdown.Item onClick={handleLogout} text='logout' icon='power' />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  )
})