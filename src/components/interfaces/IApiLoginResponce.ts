import IApiResponce from './IApiResponce'

interface Message {
  username?: string
  password?: string
  token?: string
}
export default interface IApiLoginResponce extends IApiResponce {
  message: Message
}
