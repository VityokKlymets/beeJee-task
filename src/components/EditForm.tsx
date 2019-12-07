import { Form, Button, Message } from "semantic-ui-react";
import { Formik } from "formik";
import React from "react";
import useEditForm from "./hooks/controllers/useEditForm";

interface IProps {
  initialData: {
    status: number;
    text: string;
    id: number
  }
}

const EditForm: React.FC<IProps> = ({
  initialData = { status: 0, text: "",id: 0 },
}) => {
  const { initialValues, onSubmit, validate, responce } = useEditForm(
    initialData,
  );
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
            value={values.text}
            name="text"
            label="Text"
            error={errors.text}
            required
            fluid
          ></Form.Input>
          <Form.Input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.status}
            error={errors.status}
            name="status"
            label="Status"
            required
            fluid
          ></Form.Input>
          <Message
            success
            header="Task changed"
          />
          <Message
            error
            header="Invalid token"
          />
          <Button disabled={isSubmitting}>Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default EditForm;
