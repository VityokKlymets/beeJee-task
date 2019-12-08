const KEY = 'token'

export const getToken = () => {
	return localStorage.getItem(KEY) || ''
}

export const setToken = (token: string) => {
	return localStorage.setItem(KEY, token)
}
