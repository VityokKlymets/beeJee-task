import _ from "lodash";
import React from "react";
import {
  Button,
  Checkbox,
  Container,
  Icon,
  Modal,
  Pagination,
  Table,
} from "semantic-ui-react";

import EditForm from "components/EditForm";
import useTaskList from "components/hooks/controllers/useTaskList";

const TaskList: React.FC = () => {
  const {
    tasks,
    totalPages,
    onPageChange,
    handleSort,
    sort: { field, direction },
    authorized,
    onTaskStatusChange,
    editingTask,
    taskEdit,
    onTaskEditClick,
    onTaskEditClose,
  } = useTaskList();

  const renderAuthorizedStatusCell = (taskId: number, status: number) => (
    <Checkbox
      onClick={() => onTaskStatusChange(taskId, status)}
      checked={!!status}
    />
  );

  const renderStatusCell = (status: number) => {
    const color = status ? "green" : "red";
    const name = status ? "checkmark" : "close";
    return <Icon color={color} name={name} />;
  };

  const renderEditTableCell = (
    taskId: number,
    status: number,
    text: string,
  ) => (
    <Table.Cell textAlign="center">
      <Button
        icon="edit"
        onClick={() => onTaskEditClick(taskId, status, text)}
      />
    </Table.Cell>
  );

  return (tasks.length !== 0) ? (
      <Container fluid={true}>
        <Table size="large" basic="very" celled={true} fixed={true} sortable={true}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                onClick={handleSort("username")}
                sorted={field === "username" ? direction : undefined}
              >
                Username
              </Table.HeaderCell>
              <Table.HeaderCell
                onClick={handleSort("email")}
                sorted={field === "email" ? direction : undefined}
              >
                Email
              </Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell
                colSpan="2"
                onClick={handleSort("status")}
                sorted={field === "status" ? direction : undefined}
              >
                Status
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(tasks, ({ id, username, email, text, status }) => (
              <Table.Row key={id}>
                <Table.Cell>{username}</Table.Cell>
                <Table.Cell>{email}</Table.Cell>
                <Table.Cell>{text}</Table.Cell>
                <Table.Cell colSpan={authorized ? 1 : 2} textAlign="center">
                  {authorized
                    ? renderAuthorizedStatusCell(id, status)
                    : renderStatusCell(status)}
                </Table.Cell>
                {authorized && renderEditTableCell(id, status, text)}
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell textAlign="center" colSpan="5">
                <Pagination
                  onPageChange={onPageChange}
                  defaultActivePage={1}
                  totalPages={totalPages}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <Modal onClose={onTaskEditClose} open={taskEdit}>
          <Modal.Header>Edit Task</Modal.Header>
          <Modal.Content>
            <EditForm initialData={editingTask} />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={onTaskEditClose} negative={true}>
              Close
            </Button>
          </Modal.Actions>
        </Modal>
      </Container>) : null;
};

export default TaskList;
