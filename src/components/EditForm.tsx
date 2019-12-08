import React from 'react'
import { Formik } from 'formik'
import { Form, Button, Message, Checkbox } from 'semantic-ui-react'

import useEditForm from './hooks/controllers/useEditForm'

interface IProps {
	initialData: {
		status: number
		text: string
		id: number
	}
}

const EditForm: React.FC<IProps> = ({ initialData }) => {
	const { initialValues, onSubmit, validate, responce } = useEditForm(initialData)
	const { status } = responce
	return (
		<Formik validate={validate} onSubmit={onSubmit} initialValues={initialValues}>
			{({ isSubmitting, values, errors, handleChange, handleBlur, handleSubmit }) => (
				<Form
					size='large'
					success={status === 'ok'}
					error={status === 'error'}
					onSubmit={handleSubmit}
					loading={isSubmitting}
				>
					<Form.Input
						onChange={handleChange}
						onBlur={handleBlur}
						label='Text'
						value={values.text}
						name='text'
						error={errors.text}
						required
						fluid
					></Form.Input>
					<Form.Input
						onChange={handleChange}
						onBlur={handleBlur}
						label='Status'
						value={values.status}
						name='status'
						error={errors.status}
						required
						fluid
					></Form.Input>
					<Message success header='Task changed' />
					<Message error header='Invalid token' />
					<Button disabled={isSubmitting}>Submit</Button>
				</Form>
			)}
		</Formik>
	)
}

export default EditForm
