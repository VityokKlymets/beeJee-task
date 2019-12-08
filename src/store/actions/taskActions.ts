import ITask from "components/interfaces/ITask";
import { EDIT_TASK, INIT_TASKS, TaskActionTypes } from "store/types/task";

export const initTasks = (tasks: ITask[]): TaskActionTypes => {
  return {
    payload: {
      tasks,
    },
    type: INIT_TASKS,
  };
};

export const editTask = (
  id: number,
  status?: number,
  text?: string,
): TaskActionTypes => {
  return {
    payload: {
      id,
      status,
      text,
    },
    type: EDIT_TASK,
  };
};
