import ITask from "../../components/interfaces/ITask";

export const INIT_TASKS = "INIT_TASKS";
export const EDIT_TASK = "EDIT_TASK";


export interface TaskState{
    tasks: Array<ITask>
}

export interface initTasksAction {
  type: typeof INIT_TASKS;
  payload: {
    tasks: Array<ITask>;
  };
}

export interface editTaskAction {
  type: typeof EDIT_TASK;
  payload: {
    id: number,
    status?:  number,
    text? : string
  }
}


export type TaskActionTypes = initTasksAction | editTaskAction