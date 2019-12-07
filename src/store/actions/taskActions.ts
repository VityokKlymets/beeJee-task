import ITask from "../../components/interfaces/ITask";
import { TaskActionTypes, INIT_TASKS, EDIT_TASK } from "../types/task";

export function initTasks(tasks: ITask[]): TaskActionTypes {
  return {
    type: INIT_TASKS,
    payload: {
      tasks
    }
  };
}
export function editTask(
  id: number,
  status?: number,
  text?: string
): TaskActionTypes {
  return {
    type: EDIT_TASK,
    payload: {
      id,
      status,
      text
    }
  };
}
