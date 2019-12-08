import { setToken } from "components/utils/localStorage/token";
import { DELETE_TOKEN, SET_TOKEN, TokenActionTypes } from "store/types/token";

const initialState = "";

export default (state = initialState, action: TokenActionTypes): string => {
  switch (action.type) {
    case SET_TOKEN:
      const token = action.payload.token;
      setToken(token);
      return token;
    case DELETE_TOKEN:
      setToken("");
      return "";
    default:
      return state;
  }
};
