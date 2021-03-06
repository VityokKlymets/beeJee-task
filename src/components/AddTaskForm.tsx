import { Formik } from "formik";
import React from "react";
import { Button, Form, Message } from "semantic-ui-react";

import _ from "lodash";

import useAddTaskForm from "components/hooks/controllers/useAddTaskForm";

const AddTaskForm: React.FC = () => {
  const { initialValues, onSubmit, validate, responce } = useAddTaskForm();
  const { message, status } = responce;

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
          success={status === "ok"}
          error={status === "error"}
          onSubmit={handleSubmit}
          loading={isSubmitting}
        >
          <Form.Input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            name="email"
            label="Email"
            error={errors.email}
            required={true}
            fluid={true}
          />
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
            value={values.text}
            error={errors.text}
            name="text"
            type="textarea"
            label="Text"
            required={true}
            fluid={true}
          />
          <Message
            success={true}
            header="Task Added"
            content={`Task id=${message.id} successfully added!`}
          />
          <Message
            error={true}
            header="There was some errors with your data"
            list={[..._.values(message)]}
          />
          <Button disabled={isSubmitting}>Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddTaskForm;
