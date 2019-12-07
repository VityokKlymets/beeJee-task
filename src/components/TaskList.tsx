import React from "react";
import useTaskList from "./hooks/controllers/useTaskList";
import {
  Table,
  Pagination,
  Container,
  Button,
  Icon,
  Modal,
  Checkbox
} from "semantic-ui-react";
import _ from "lodash";
import EditForm from "./EditForm";
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
    onTaskEditClose
  } = useTaskList();
  if (tasks.length !== 0)
    return (
      <Container>
        <Table size='large' basic='very' celled  fixed sortable>
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
              <Table.Row>
                <Table.Cell>{username}</Table.Cell>
                <Table.Cell>{email}</Table.Cell>
                <Table.Cell>{text}</Table.Cell>
                <Table.Cell colSpan={authorized ? 1 : 2} textAlign="center">
                  {authorized ? (
                    <Checkbox
                      onClick={() => onTaskStatusChange(id, status)}
                      checked={!!status}
                    ></Checkbox>
                  ) : status ? (
                    <Icon color="green" name="checkmark" />
                  ) : (
                    <Icon color="red" name="close" />
                  )}
                </Table.Cell>
                {authorized && (
                  <Table.Cell textAlign="center">
                    <Button
                      onClick={() => onTaskEditClick(id, status, text)}
                      icon="edit"
                    ></Button>
                  </Table.Cell>
                )}
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
            <Button onClick={onTaskEditClose} negative>
              Close
            </Button>
          </Modal.Actions>
        </Modal>
      </Container>
    );
  else return <div>No task here</div>;
};

export default TaskList;
