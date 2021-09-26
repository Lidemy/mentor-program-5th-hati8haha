import styled from "styled-components"
import { TodoBtn } from "../constants/style"

const TodoTitle = styled.h1`
  display: flex;
  justify-content: center;
`
const AddTodoArea = styled.div`
  display: flex;
  justify-content: center;
`
const TodoInputArea = styled.input`
  margin-right: 1rem;
  border-radius: 4px;
  border-color: #ccc;
  line-height: 1.5rem;
  box-sizing: border-box;
  width: 40%;
`

export default function TodoHeader({
  inputContent,
  todos,
  onUpdate,
  onInputContentChange,
  onTodosChange,
  onHandleUpdate,
}) {
  // useEffect(() => {
  //   onInputContentChange(inputContent)
  // }, [inputContent])

  // useEffect(() => {
  //   onTodosChange(todos)
  // }, [todos])

  function AddTodoBtn() {
    return (
      <TodoBtn onClick={handleAddTodo}>
        {onUpdate.update ? "更新" : "新增"}
      </TodoBtn>
    )
  }

  const handleAddTodo = () => {
    if (inputContent === "") {
      alert("請輸入 todo")
      return
    }
    if (onUpdate.update) {
      onHandleUpdate(onUpdate.id)
      onInputContentChange("")
      return
    }
    onInputContentChange(inputContent)
    onTodosChange(todos)
    onInputContentChange("")
  }

  return (
    <div>
      <TodoTitle>Todos</TodoTitle>
      <AddTodoArea>
        <TodoInputArea
          type="text"
          value={inputContent}
          onChange={(e) => {
            onInputContentChange(e.target.value)
          }}
        />
        <AddTodoBtn onClick={handleAddTodo} />
      </AddTodoArea>
    </div>
  )
}
