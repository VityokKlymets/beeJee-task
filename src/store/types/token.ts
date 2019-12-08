export const SET_TOKEN = 'SET_TOKEN'
export const DELETE_TOKEN = 'DELETE_TOKEN'

export interface setTokenAction {
	type: typeof SET_TOKEN
	payload: {
		token: string
	}
}

export interface deleteTokenAction {
	type: typeof DELETE_TOKEN
}

export type TokenActionTypes = setTokenAction | deleteTokenAction
