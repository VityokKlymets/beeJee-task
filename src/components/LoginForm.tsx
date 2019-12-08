import { Formik } from "formik";
import React from "react";
import { Button, Form, Message } from "semantic-ui-react";

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
        handleSubmit,
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
            required={true}
            fluid={true}
          />
          <Form.Input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={errors.password}
            name="password"
            type="password"
            label="Password"
            required={true}
            fluid={true}
          />
          <Message
            error={true}
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
