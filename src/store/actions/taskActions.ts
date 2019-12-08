import ITask from 'components/interfaces/ITask'
import { TaskActionTypes, INIT_TASKS, EDIT_TASK } from 'store/types/task'

export const initTasks = (tasks: Array<ITask>): TaskActionTypes => {
	return {
		type: INIT_TASKS,
		payload: {
			tasks,
		},
	}
}

export const editTask = (id: number, status?: number, text?: string): TaskActionTypes => {
	return {
		type: EDIT_TASK,
		payload: {
			id,
			status,
			text,
		},
	}
}
