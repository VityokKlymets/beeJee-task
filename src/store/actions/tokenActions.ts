import { SET_TOKEN, TokenActionTypes, DELETE_TOKEN } from 'store/types/token'

export const setToken = (token: string): TokenActionTypes => {
	return {
		type: SET_TOKEN,
		payload: {
			token,
		},
	}
}
export const deleteToken = (): TokenActionTypes => {
	return {
		type: DELETE_TOKEN,
	}
}
