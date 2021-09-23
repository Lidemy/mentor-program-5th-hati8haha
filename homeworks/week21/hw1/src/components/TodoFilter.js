import styled from "styled-components"
import { useContext } from "react"
import { FilterContext } from "../App"

const TodoFilterWrapper = styled.div`
  margin: 1rem auto;
  display: flex;
  justify-content: center;

  & > div:first-child {
    margin-right: 2rem;
  }
`

const TodoFilterBlock = styled.div`
  box-sizing: border-box;
  display: inline;
  padding: 0 0.8rem;
  border: 1px solid royalblue;
  height: 1.7rem;
  ${(props) =>
    props.active &&
    `
    color: white;
    background: royalblue;
  `}
  transition: all 0.2s;
  &:hover {
    cursor: pointer;
  }
`

const ClearTodo = styled.div`
  font-weight: bold;
  color: darksalmon;
  transition: color 0.2s;
  &:hover {
    cursor: pointer;
    color: darkred;
  }
`

export default function TodoFilter({ onFilterChange, onClearTodo }) {
  const filter = useContext(FilterContext)
  return (
    <TodoFilterWrapper>
      <div>
        <TodoFilterBlock
          active={filter === "all" ? true : false}
          onClick={() => {
            onFilterChange("all")
          }}
        >
          全部
        </TodoFilterBlock>
        <TodoFilterBlock
          active={filter === "completed" ? true : false}
          onClick={() => {
            onFilterChange("completed")
          }}
        >
          已完成
        </TodoFilterBlock>
        <TodoFilterBlock
          active={filter === "uncompleted" ? true : false}
          onClick={() => {
            onFilterChange("uncompleted")
          }}
        >
          未完成
        </TodoFilterBlock>
      </div>
      <div>
        <ClearTodo
          onClick={() => {
            onClearTodo()
          }}
        >
          清空
        </ClearTodo>
      </div>
    </TodoFilterWrapper>
  )
}
