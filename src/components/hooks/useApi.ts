import axios, { AxiosRequestConfig } from 'axios'
import { useEffect, useState } from 'react'
import { API_BASE } from 'config/config'

export default <T>(
	url: string,
	method: AxiosRequestConfig['method'] = 'POST',
	initialState: T,
	deps: readonly any[],
): T => {
	const [result, setResult] = useState<T>(initialState)
	useEffect(() => {
		;(async () => {
			const responce = await axios({
				method: method,
				baseURL: API_BASE,
				url,
			})
			setResult(responce.data)
		})()
	}, deps)
	return result
}
