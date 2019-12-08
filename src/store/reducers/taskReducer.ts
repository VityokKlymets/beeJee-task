import { TaskState, INIT_TASKS, TaskActionTypes, EDIT_TASK } from 'store/types/task'
import _ from 'lodash'

const initialState: TaskState = {
	tasks: [],
}

export default (state = initialState, action: TaskActionTypes): TaskState => {
	switch (action.type) {
		case INIT_TASKS:
			return {
				...state,
				tasks: action.payload.tasks,
			}
		case EDIT_TASK:
			const tasks = _.map(state.tasks, task => {
				if (task.id === action.payload.id) {
					const { status, text } = action.payload
					task.status = status
					task.text = text || task.text
				}
				return task
			})
			return {
				...state,
				tasks,
			}
		default:
			return state
	}
}
