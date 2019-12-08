import { FormikHelpers } from 'formik'

import { useState } from 'react'
import IApiAddTaskResponce from 'components/interfaces/IApiAddTaskResponce'
import post from 'components/utils/api/post'

interface IFormData {
  username: string
  email: string
  text: string
}

interface IValidateErrors {
  username?: string
  email?: string
  text?: string
}

export default () => {
  const initialValues: IFormData = {
    username: '',
    email: '',
    text: ''
  }
  const [responce, setResponce] = useState<IApiAddTaskResponce>({
    status: '',
    message: {}
  })

  const onSubmit = async (values: IFormData, actions: FormikHelpers<IFormData>) => {
    actions.setSubmitting(true)

    const data = new FormData()
    data.append('email', values.email)
    data.append('text', values.text)
    data.append('username', values.username)

    const responce = await post<IApiAddTaskResponce>('/create', data)

    setResponce(responce)

    actions.setSubmitting(false)
  }

  const validate = (values: IFormData) => {
    const errors: IValidateErrors = {}
    const { email, username, text } = values

    if (!email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = 'Invalid email address'
    }

    if (!username) errors.username = 'Required'
    if (!text) errors.text = 'Required'

    return errors
  }

  return {
    initialValues,
    onSubmit,
    validate,
    responce
  }
}
