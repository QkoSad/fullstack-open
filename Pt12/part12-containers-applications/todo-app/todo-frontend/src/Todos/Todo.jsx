import { useEffect, useState } from 'react'
import axios from '../util/apiClient'

const SingleTodoView = () => {
  const [todo, setTodo] = useState([])

  const refreshTodo = async () => {
    const { data } = await axios.get('/todos/:id')
    setTodo(data)
  }

  useEffect(() => {
    refreshTodo()
  }, [])

  return (
    <>
      <h1>Todo</h1>
      <div>{todo.text}</div>
      <div>{todo.done}</div>
      <div>{todo._id}</div>
    </>
  )
}

export default SingleTodoView
