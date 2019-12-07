import { Form, Button, Message } from "semantic-ui-react";
import { Formik } from "formik";
import React from "react";
import useAddTaskForm from "./hooks/controllers/useAddTaskForm";

const AddTaskForm: React.FC = () => {
  const { initialValues, onSubmit, validate, responce } = useAddTaskForm();
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
          size='large'
          success={responce.status === "ok"}
          error={responce.status === "error"}
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
            required
            fluid
          ></Form.Input>
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
            value={values.text}
            error={errors.text}
            name="text"
            type="textarea"
            label="Text"
            required
            fluid
          ></Form.Input>
          <Message
            success
            header="Task Added"
            content={`Task id=${responce.message.id} successfully added!`}
          />
          <Message
            error
            header="There was some errors with your data"
            list={[
              responce.message.text,
              responce.message.email,
              responce.message.username
            ]}
          />
          <Button disabled={isSubmitting}>Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddTaskForm;
