import IApiResponce from './IApiResponce'
import ITask from './ITask'

interface ITaskMessage {
  tasks: ITask[]
  total_task_count: number
}

export default interface IApiTasksResponce extends IApiResponce {
  message: ITaskMessage
}
