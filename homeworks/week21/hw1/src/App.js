import { useState, useRef, useEffect, createContext } from "react"

import TodoHeader from "./components/TodoHeader"
import TodoCard from "./components/TodoCard"
import TodoFilter from "./components/TodoFilter"
import styled from "styled-components"

export const TodoWrapper = styled.div`
  margin: 0 auto;
  border-radius: 8px;
  border: 1px #ccc solid;
  width: 500px;
`
export const FilterContext = createContext()

function writeTodosToLocalStorage(todos) {
  window.localStorage.setItem("todos", JSON.stringify(todos))
}

function App() {
  const id = useRef(1)
  const [inputContent, setInputContent] = useState("")
  const [todos, setTodos] = useState(() => {
    let todoData = window.localStorage.getItem("todos") || ""
    if (todoData && todoData !== "[]") {
      todoData = JSON.parse(todoData)
      id.current = todoData[0].id + 1
    } else {
      todoData = []
    }
    return todoData
  })
  const [filter, setFilter] = useState("all")
  const [onUpdate, setOnUpdate] = useState({ update: false, id: null })

  const handleSetInputContent = (content) => {
    setInputContent(content)
  }
  const handleSetTodos = (todos) => {
    setTodos([
      {
        id: id.current,
        content: inputContent,
        isDone: false,
        show: true,
      },
      ...todos,
    ])
    id.current++
  }
  const handleTodoStatus = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo
        return {
          ...todo,
          isDone: !todo.isDone,
        }
      })
    )
  }

  const handleTodoFilter = (currentFilter) => {
    setFilter(currentFilter)
  }

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleUpdateTodo = (id) => {
    setInputContent(todos.filter((todo) => todo.id === id)[0].content)
    setOnUpdate({ update: true, id })
  }

  const handleUpdate = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo
        return {
          ...todo,
          content: inputContent,
        }
      })
    )
    setOnUpdate({ update: false, id: null })
  }

  const todoFilter = (todo) => {
    const todoCardJsx = (
      <TodoCard
        key={todo.id}
        todo={todo}
        onChangeStatus={handleTodoStatus}
        onDeleteTodo={handleDeleteTodo}
        onUpdateTodo={handleUpdateTodo}
      />
    )
    switch (filter) {
      case "completed":
        return todo.isDone && todoCardJsx
      case "uncompleted":
        return !todo.isDone && todoCardJsx
      default:
        return todoCardJsx
    }
  }

  const handleClearTodo = () => {
    setTodos([])
  }

  useEffect(() => {
    writeTodosToLocalStorage(todos)
  }, [todos])

  return (
    <TodoWrapper>
      <TodoHeader
        inputContent={inputContent}
        todos={todos}
        onInputContentChange={handleSetInputContent}
        onTodosChange={handleSetTodos}
        onUpdate={onUpdate}
        onHandleUpdate={handleUpdate}
      />
      <FilterContext.Provider value={filter}>
        <TodoFilter
          onFilterChange={handleTodoFilter}
          onClearTodo={handleClearTodo}
        />
      </FilterContext.Provider>
      {todos.map(todoFilter)}
    </TodoWrapper>
  )
}

export default App
