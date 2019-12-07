import { Form, Button, Message } from "semantic-ui-react";
import { Formik } from "formik";
import React from "react";
import useLoginForm from "./hooks/controllers/useLoginForm";

const LoginForm: React.FC = () => {
  const { initialValues, onSubmit, validate, responce } = useLoginForm();
  return (
    <Formik
      validate={validate}
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      {({
        isSubmitting,
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit
      }) => (
        <Form
          size="large"
          error={responce.status === "error"}
          onSubmit={handleSubmit}
          loading={isSubmitting}
        >
          <Form.Input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            error={errors.username}
            name="username"
            label="Username"
            required
            fluid
          ></Form.Input>
          <Form.Input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={errors.password}
            name="password"
            type="password"
            label="Password"
            required
            fluid
          ></Form.Input>
          <Message
            error
            header="Action Forbidden"
            content={responce.message ? responce.message.password : ""}
          />
          <Button disabled={isSubmitting}>Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
