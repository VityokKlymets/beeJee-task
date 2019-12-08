import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container, Grid, Menu } from "semantic-ui-react";

import AddTaskForm from "components/AddTaskForm";
import LeftMenu from "components/LeftMenu";
import LoginForm from "components/LoginForm";
import TaskList from "components/TaskList";

import useApp from "components/hooks/controllers/useApp";

const App: React.FC = () => {
  const { authorized, logout } = useApp();
  return (
    <div>
      <Menu fixed="top" size="large" color="teal" inverted={true}>
        <Container>
          <Menu.Item position="left" header={true}>
            Task Manager
          </Menu.Item>
        </Container>
      </Menu>
      <Grid padded={true}>
        <Grid.Row>
          <Grid.Column width={3}>
            <LeftMenu handleLogout={logout} authorized={authorized}/>
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
