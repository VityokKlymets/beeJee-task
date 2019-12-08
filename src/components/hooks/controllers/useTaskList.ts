import { useState, SyntheticEvent, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'

import { initTasks, editTask } from 'store/actions/taskActions'
import isAuthenticated from 'store/selectors/isAuthenticated'
import tasksSelector from 'store/selectors/tasksSelector'

import IApiTasksResponce from 'components/interfaces/IApiTasksResponce'
import IApiEditTaskResponce from 'components/interfaces/IApiEditTaskResponce'

import post from 'components/utils/api/post'
import get from 'components/utils/api/get'
import { getToken } from 'components/utils/localStorage/token'

import { TASKS_PER_PAGE } from 'config/config'

type SortField = 'id' | 'username' | 'email' | 'status'

interface SortPagination {
  direction?: 'ascending' | 'descending'
  field?: SortField
}

export default () => {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const [editingTask, setEditingTask] = useState()
  const [taskEdit, setTaskEdit] = useState(false)

  const [sort, setSort] = useState<SortPagination>({})

  const dispatch = useDispatch()
  const history = useHistory()
  const authorized = useSelector(isAuthenticated)
  const tasks = useSelector(tasksSelector)

  const direction =
    sort.direction === 'ascending' ? 'asc' : sort.direction === 'descending' ? 'desc' : ''

  useEffect(() => {
    ;(async () => {
      const query = { page, sort_field: sort.field, sort_direction: direction }

      const responce = await get<IApiTasksResponce>('/', query)
      const { tasks, total_task_count } = responce.message
      const totalPages = Math.ceil(total_task_count / TASKS_PER_PAGE)

      setTotalPages(totalPages)
      dispatch(initTasks(tasks))
    })()
  }, [page, sort])

  const onPageChange = (event: SyntheticEvent, data: any) => {
    const { activePage } = data
    setPage(activePage)
  }

  const onTaskEditClick = (taskId: number, status: number, text: string) => {
    setEditingTask({
      id: taskId,
      status,
      text
    })
    setTaskEdit(true)
  }

  const onTaskEditClose = () => {
    setTaskEdit(false)
  }

  const handleSort = (clickedColumn: SortField) => () => {
    setSort({
      direction: sort.direction === 'ascending' ? 'descending' : 'ascending',
      field: clickedColumn
    })
  }

  const onTaskStatusChange = async (taskId: number, taskStatus: number) => {
    const status = !!taskStatus ? 0 : 10
    const token = getToken()

    const body = new FormData()
    body.append('status', status.toString())
    body.append('token', token)

    const responce = await post<IApiEditTaskResponce>(`/edit/${taskId}`, body)
    if (responce.status === 'ok') {
      dispatch(editTask(taskId, status))
    }

    if (responce.status === 'error') {
      history.push('/login')
    }
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
  }
}
