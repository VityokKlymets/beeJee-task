import { FormikHelpers } from "formik";
import post from "../../utils/api/post";
import IApiLoginResponce from "../../interfaces/IApiLoginResponce";
import {useHistory} from 'react-router-dom'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../../store/actions/tokenActions";
interface IFormData{
    username: string,
    password: string,
}
interface IValidateErrors{
    username?: string,
    password?: string,
}
export default () => {
    const initialValues: IFormData = {
        username: '',
        password: '',
    }
    const dispatch = useDispatch()
    const history = useHistory()
    const [responce,setResponce] = useState<IApiLoginResponce>({
        status: undefined,
        message: {
            token: ''
        },
    })
    const onSubmit = async (values: IFormData, actions: FormikHelpers<IFormData>) => {
        actions.setSubmitting(true);
        const data = new FormData();
        data.append('username',values.username)
        data.append('password',values.password)
        const responce = await post<IApiLoginResponce>('/login',data)
        if(responce.status==='ok'){
            const token = responce.message.token;
            dispatch(setToken(responce.message.token))
            history.push('/')
            localStorage.setItem('token',token)
        }
        actions.setSubmitting(false);
        setResponce(responce)
    }
    const validate = (values: IFormData) => {
        const errors: IValidateErrors = {};
        if(!values.username) errors.username = 'Required'
        if(!values.password) errors.password = 'Required'
        return errors;
    }
    return {
        initialValues,
        onSubmit,
        validate,
        responce
    }
}