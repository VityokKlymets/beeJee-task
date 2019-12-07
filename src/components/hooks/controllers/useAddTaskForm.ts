import { FormikHelpers } from "formik";
import post from "../../utils/api/post";
import IApiAddTaskResponce from "../../interfaces/IApiAddTaskResponce";
import { useState } from "react";
interface IFormData{
    username: string,
    email: string,
    text: string
}
interface IValidateErrors{
    username?: string,
    email?: string,
    text?: string
}
export default () => {
    const initialValues: IFormData = {
        username: '',
        email: '',
        text: ''
    }
    const [responce,setResponce] = useState<IApiAddTaskResponce>({
        status: undefined,
        message: {
            username: '',
            email: '',
            text: ''
        }
    })
    const onSubmit = async (values: IFormData, actions: FormikHelpers<IFormData>) => {
        actions.setSubmitting(true);
        const data = new FormData();
        data.append('email',values.email)
        data.append('text',values.text)
        data.append('username',values.username)
        const responce = await post<IApiAddTaskResponce>('/create',data)
        actions.setSubmitting(false);
        setResponce(responce)
    }
    const validate = (values: IFormData) => {
        const errors: IValidateErrors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }

        if(!values.username) errors.username = 'Required'
        if(!values.text) errors.text = 'Required'
        return errors;
    }
    return {
        initialValues,
        onSubmit,
        validate,
        responce
    }
}