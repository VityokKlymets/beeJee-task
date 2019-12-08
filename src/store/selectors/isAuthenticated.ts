import { createSelector } from "reselect";

const tokenSelector = (state: any) => state.token;
export default createSelector(tokenSelector, (token) => !!token);
