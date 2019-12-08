import { FormikHelpers } from 'formik'

import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import IApiLoginResponce from 'components/interfaces/IApiLoginResponce'
import { setToken } from 'store/actions/tokenActions'
import post from 'components/utils/api/post'

interface IFormData {
	username: string
	password: string
}
interface IValidateErrors {
	username?: string
	password?: string
}
export default () => {
	const initialValues: IFormData = {
		username: '',
		password: '',
	}
	const dispatch = useDispatch()
	const history = useHistory()
	const [responce, setResponce] = useState<IApiLoginResponce>({
		status: '',
		message: {},
	})
	const onSubmit = async (values: IFormData, actions: FormikHelpers<IFormData>) => {
		actions.setSubmitting(true)

		const data = new FormData()
		data.append('username', values.username)
		data.append('password', values.password)

		const responce = await post<IApiLoginResponce>('/login', data)

		if (responce.status === 'ok') {
			const { token } = responce.message
			dispatch(setToken(token || ''))
			history.push('/')
		}

		actions.setSubmitting(false)
		setResponce(responce)
	}
	const validate = (values: IFormData) => {
		const errors: IValidateErrors = {}
		const { username, password } = values

		if (!username) errors.username = 'Required'
		if (!password) errors.password = 'Required'
		
		return errors
	}
	return {
		initialValues,
		onSubmit,
		validate,
		responce,
	}
}
