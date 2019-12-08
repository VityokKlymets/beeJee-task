import axios from 'axios'
import _ from 'lodash'
import { API_BASE, DEVELOPER_NAME } from 'config/config'

export default async <T>(url: string, query?: any): Promise<T> => {
	const pureQuery = _.pickBy(query, _.identity)
	const responce = await axios({
		method: 'GET',
		baseURL: API_BASE,
		params: {
			developer: DEVELOPER_NAME,
			...pureQuery
		},
		url
	})
	const data: T = responce.data
	return data
}
