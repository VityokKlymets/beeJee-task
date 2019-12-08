import { FormikHelpers } from "formik";

import IApiAddTaskResponce from "components/interfaces/IApiAddTaskResponce";
import post from "components/utils/api/post";
import { useState } from "react";

interface IFormData {
  username: string;
  email: string;
  text: string;
}

interface IValidateErrors {
  username?: string;
  email?: string;
  text?: string;
}

export default () => {
  const initialValues: IFormData = {
    email: "",
    text: "",
    username: "",
  };
  const [responce, setResponce] = useState<IApiAddTaskResponce>({
    message: {},
    status: "",
  });

  const onSubmit = async (
    values: IFormData,
    actions: FormikHelpers<IFormData>,
  ) => {
    actions.setSubmitting(true);

    const data = new FormData();
    data.append("email", values.email);
    data.append("text", values.text);
    data.append("username", values.username);

    const res = await post<IApiAddTaskResponce>("/create", data);

    setResponce(res);

    actions.setSubmitting(false);
  };

  const validate = (values: IFormData) => {
    const errors: IValidateErrors = {};
    const { email, username, text } = values;

    if (!email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = "Invalid email address";
    }

    if (!username) { errors.username = "Required"; }
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
