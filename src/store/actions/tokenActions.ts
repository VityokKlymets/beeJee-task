import { DELETE_TOKEN, SET_TOKEN, TokenActionTypes } from "store/types/token";

export const setToken = (token: string): TokenActionTypes => {
  return {
    payload: {
      token,
    },
    type: SET_TOKEN,
  };
};
export const deleteToken = (): TokenActionTypes => {
  return {
    type: DELETE_TOKEN,
  };
};
