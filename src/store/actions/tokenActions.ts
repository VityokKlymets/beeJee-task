import { SET_TOKEN, TokenActionTypes, DELETE_TOKEN } from "../types/token";

export function setToken(token: string): TokenActionTypes {
  return {
    type: SET_TOKEN,
    payload: {
      token
    }
  };
}
export function deleteToken(): TokenActionTypes {
  return {
    type: DELETE_TOKEN
  };
}
