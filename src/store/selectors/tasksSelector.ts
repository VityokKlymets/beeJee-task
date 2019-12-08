import { createSelector } from "reselect";

const tasksSelector = (state: any) => state.task.tasks;
export default createSelector(tasksSelector, (tasks) => tasks);
