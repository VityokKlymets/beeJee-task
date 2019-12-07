import { SyntheticEvent, useState, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, deleteToken } from "../../../store/actions/tokenActions";
import isAuthenticated from "../../../store/selectors/isAuthenticated";
import { ButtonProps } from "semantic-ui-react";
import { useHistory } from "react-router";

export default () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const token = localStorage.getItem("token");
  if (token) {
    dispatch(setToken(token));
  }
  const authorized = useSelector(isAuthenticated);

  const logout = (e: MouseEvent<HTMLButtonElement>, data: ButtonProps) => {
    dispatch(deleteToken());
    history.push('/')
  };
  
  return {
    authorized,
    logout,
  };
};
