import { FormikHelpers } from "formik";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import IApiLoginResponce from "components/interfaces/IApiLoginResponce";
import post from "components/utils/api/post";
import { setToken } from "store/actions/tokenActions";

interface IFormData {
  username: string;
  password: string;
}
interface IValidateErrors {
  username?: string;
  password?: string;
}
export default () => {
  const initialValues: IFormData = {
    password: "",
    username: "",
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const [responce, setResponce] = useState<IApiLoginResponce>({
    message: {},
    status: "",
  });
  const onSubmit = async (
    values: IFormData,
    actions: FormikHelpers<IFormData>,
  ) => {
    actions.setSubmitting(true);

    const data = new FormData();
    data.append("username", values.username);
    data.append("password", values.password);

    const res = await post<IApiLoginResponce>("/login", data);

    if (res.status === "ok") {
      const { token } = res.message;
      dispatch(setToken(token || ""));
      history.push("/");
    }

    actions.setSubmitting(false);
    setResponce(res);
  };
  const validate = (values: IFormData) => {
    const errors: IValidateErrors = {};
    const { username, password } = values;

    if (!username) { errors.username = "Required"; }
    if (!password) { errors.password = "Required"; }

    return errors;
  };
  return {
    initialValues,
    onSubmit,
    responce,
    validate,
  };
};
