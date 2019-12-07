import { TokenActionTypes, SET_TOKEN, DELETE_TOKEN } from "../types/token";

const initialState = "";
export default (state = initialState, action: TokenActionTypes): string => {
  switch (action.type) {
    case SET_TOKEN:
      return action.payload.token;
    case DELETE_TOKEN:
      localStorage.setItem("token", "");      
      return "";
    default:
      return state;
  }
};
