import React from "react";
import { Grid, Menu, Container } from "semantic-ui-react";
import { Switch, Route } from "react-router-dom";

import TaskList from "./components/TaskList";
import LeftMenu from "./components/LeftMenu";
import AddTaskForm from "./components/AddTaskForm";
import LoginForm from "./components/LoginForm";

import useApp from "./components/hooks/controllers/useApp";

const App: React.FC = () => {
  const { authorized, logout } = useApp();
  return (
    <div>
      <Menu fixed="top" size='large' color="teal" inverted={true}>
        <Container>
          <Menu.Item  position="left" header={true}>
            Task Manager
          </Menu.Item>
        </Container>
      </Menu>
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={3}>
            <LeftMenu
              handleLogout={logout}
              authorized={authorized}
            ></LeftMenu>
          </Grid.Column>
          <Grid.Column width={9}>
            <Switch>
              <Route path="/add">
                <AddTaskForm />
              </Route>
              <Route path="/login">
                <LoginForm />
              </Route>
              <Route path="/">
                <TaskList />
              </Route>
            </Switch>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default App;
