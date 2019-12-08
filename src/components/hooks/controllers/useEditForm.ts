import { FormikHelpers } from "formik";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import IApiEditTaskResponce from "components/interfaces/IApiEditTaskResponce";
import { editTask } from "store/actions/taskActions";

import post from "components/utils/api/post";
import { getToken } from "components/utils/localStorage/token";

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
    status: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (
    values: IFormData,
    actions: FormikHelpers<IFormData>,
  ) => {
    actions.setSubmitting(true);

    const status = !!values.status ? 0 : 10;
    const token = getToken();

    const body = new FormData();
    body.append("status", status.toString());
    body.append("text", values.text);
    body.append("token", token);

    const res = await post<IApiEditTaskResponce>(
      `/edit/${values.id}`,
      body,
    );

    if (res.status === "ok") {
      dispatch(editTask(values.id, status, values.text));
    }
    if (res.status === "error") {
      history.push("/login");
    }

    actions.setSubmitting(false);
    setResponce(responce);
  };

  const validate = (values: IFormData) => {
    const errors: IValidateErrors = {};
    const { status, text } = values;
    const statusNumber = Number(status);
    const statusString = status.toString();

    if (statusNumber !== 0 && statusNumber !== 10) {
      errors.status = "Only 0 or 10 value allowed";
    }

    if (!statusString.match(/^[0-9]+$/)) {
      errors.status = "Only numbers allowed";
    }

    if (statusString.length === 0) { errors.status = "Required"; }

    if (!text) { errors.text = "Required"; }

    return errors;
  };

  return {
    initialValues,
    onSubmit,
    responce,
    validate,
  };
};
