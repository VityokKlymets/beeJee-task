import useApi from "../useApi";
import IApiTasksResponce from "../../interfaces/IApiTasksResponce";
import { useState, SyntheticEvent } from "react";
import { DEVELOPER_NAME, TASKS_PER_PAGE } from "../../../config/config";
import { useSelector, useDispatch } from "react-redux";
import isAuthenticated from "../../../store/selectors/isAuthenticated";
import { initTasks, editTask } from "../../../store/actions/taskActions";
import tasksSelector from "../../../store/selectors/tasksSelector";
import post from "../../utils/api/post";
import IApiEditTaskResponce from "../../interfaces/IApiEditTaskResponce";
import { getToken } from "../../utils/localStorage/token";
import { useHistory } from "react-router";

type SortField = "id" | "username" | "email" | "status";
interface SortPagination {
  direction?: "ascending" | "descending";
  field?: SortField;
}

export default () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortPagination>({
    direction: undefined,
    field: undefined
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const authorized = useSelector(isAuthenticated);
  const tasks = useSelector(tasksSelector);
  const [editingTask, setEditingTask] = useState();
  const [taskEdit, setTaskEdit] = useState(false);

  const direction =
    sort.direction === "ascending"
      ? "asc"
      : sort.direction === "descending"
      ? "desc"
      : "";

  const responce = useApi<IApiTasksResponce>(
    `/?developer=${DEVELOPER_NAME}&page=${page}&sort_field=${sort.field}&sort_direction=${direction}`,
    "GET",
    {
      status: undefined,
      message: {
        tasks: [],
        total_task_count: 0
      }
    },
    [page, sort]
  );
  dispatch(initTasks(responce.message.tasks));
  const totalPages = Math.ceil(
    responce.message.total_task_count / TASKS_PER_PAGE
  );

  const onPageChange = (event: SyntheticEvent, data: any) => {
    const { activePage } = data;
    setPage(activePage);
  };
  const handleSort = (clickedColumn: SortField) => () => {
    setSort({
      direction: sort.direction === "ascending" ? "descending" : "ascending",
      field: clickedColumn
    });
  };
  const onTaskStatusChange = async (taskId: number, taskStatus: number) => {
    const status = !!taskStatus ? 0 : 10;
    const token = getToken()
    const body = new FormData();
    body.append("status", status.toString());
    body.append("token", token);
    const responce = await post<IApiEditTaskResponce>(`/edit/${taskId}`, body);
    if (responce.status === "ok") {
      dispatch(editTask(taskId, status));
    }
    else{
      history.push('/login')
    }
  };

  const onTaskEditClick = (taskId: number, status: number, text: string) => {
    setEditingTask({
      id: taskId,
      status,
      text
    });
    setTaskEdit(true);
  };
  const onTaskEditClose = () =>{
    setTaskEdit(false)
  }

  return {
    tasks,
    totalPages,
    onPageChange,
    handleSort,
    sort,
    authorized,
    editingTask,
    taskEdit,
    onTaskEditClick,
    onTaskStatusChange,
    onTaskEditClose
  };
};
