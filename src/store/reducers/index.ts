import { combineReducers } from 'redux'
import tokenReducer from './tokenReducer'
import taskReducer from './taskReducer'

export default combineReducers({
	token: tokenReducer,
	task: taskReducer,
})
