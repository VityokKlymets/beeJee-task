import ITask from "components/interfaces/ITask";

export const INIT_TASKS = "INIT_TASKS";
export const EDIT_TASK = "EDIT_TASK";

export interface TaskState {
  tasks: ITask[];
}

export interface InitTasksAction {
  type: typeof INIT_TASKS;
  payload: {
    tasks: ITask[];
  };
}

export interface EditTaskAction {
  type: typeof EDIT_TASK;
  payload: {
    id: number;
    status?: number;
    text?: string;
  };
}

export type TaskActionTypes = InitTasksAction | EditTaskAction;
