import React, { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Button, ButtonProps, Menu } from "semantic-ui-react";

interface IProps {
  authorized: boolean;
  handleLogout: (e: MouseEvent<HTMLButtonElement>, data: ButtonProps) => void;
}

const LeftMenu: React.FC<IProps> = ({ authorized, handleLogout }) => {
  return (
    <Menu secondary={true} size="large" color="teal" vertical={true}>
      <Menu.Item as={Link} to="/" name="list">
        List
      </Menu.Item>

      <Menu.Item as={Link} to="/add" name="add">
        Add Task
      </Menu.Item>
      {authorized ? (
        <Menu.Item>
          <Button primary={true} onClick={handleLogout}>
            Logout
          </Button>
        </Menu.Item>
      ) : (
        <Menu.Item as={Link} to="/login" name="login">
          Login
        </Menu.Item>
      )}
    </Menu>
  );
};

export default LeftMenu;
