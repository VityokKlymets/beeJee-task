import IApiResponce from './IApiResponce'
import ITask from './ITask'

export default interface IApiAddTaskResponce extends IApiResponce {
	message: ITask
}
