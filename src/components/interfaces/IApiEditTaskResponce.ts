import IApiResponce from './IApiResponce'

interface Message {
  token?: string
}

export default interface IApiEditTaskResponce extends IApiResponce {
  message?: Message
}
