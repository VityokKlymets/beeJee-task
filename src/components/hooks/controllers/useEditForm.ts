import { FormikHelpers } from "formik";
import post from "../../utils/api/post";
import { useState } from "react";
import IApiEditTaskResponce from "../../interfaces/IApiEditTaskResponce";
import { useDispatch } from "react-redux";
import { editTask } from "../../../store/actions/taskActions";
import { getToken } from "../../utils/localStorage/token";
import { useHistory } from "react-router";
interface IFormData {
  status: number;
  text: string;
  id: number;
}
interface IValidateErrors {
  text?: string;
  status?: string;
}
export default (initialValues: IFormData) => {
  const [responce, setResponce] = useState<IApiEditTaskResponce>({
    status: undefined
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = async (
    values: IFormData,
    actions: FormikHelpers<IFormData>
  ) => {
    actions.setSubmitting(true);
    const status = !!values.status ? 0 : 10;
    const token = getToken();
    const body = new FormData();
    body.append("status", status.toString());
    body.append("text", values.text);
    body.append("token", token);
    const responce = await post<IApiEditTaskResponce>(
      `/edit/${values.id}`,
      body
    );
    if (responce.status === "ok") {
      dispatch(editTask(values.id, status, values.text));
    } else {
      history.push("/login");
    }
    actions.setSubmitting(false);
    setResponce(responce);
  };
  const validate = (values: IFormData) => {
    const errors: IValidateErrors = {};
    if (!values.status) errors.status = "Required";
    if (!values.text) errors.text = "Required";
    return errors;
  };
  return {
    initialValues,
    onSubmit,
    validate,
    responce
  };
};
