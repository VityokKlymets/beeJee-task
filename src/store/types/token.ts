export const SET_TOKEN = "SET_TOKEN";
export const DELETE_TOKEN = "DELETE_TOKEN";

export interface SetTokenAction {
  type: typeof SET_TOKEN;
  payload: {
    token: string;
  };
}

export interface DeleteTokenAction {
  type: typeof DELETE_TOKEN;
}

export type TokenActionTypes = SetTokenAction | DeleteTokenAction;
