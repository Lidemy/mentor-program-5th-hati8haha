import styled from "styled-components"

export const TodoWrapper = styled.div`
  margin: 0 auto;
  border-radius: 8px;
  border: 1px #ccc solid;
  width: 500px;
`
export const TodoTitle = styled.h1`
  display: flex;
  justify-content: center;
`
export const AddTodoArea = styled.div`
  display: flex;
  justify-content: center;
`
export const TodoInputArea = styled.input`
  margin: 0 1rem;
  border-radius: 4px;
  border-color: #ccc;
  line-height: 1.5rem;
  box-sizing: border-box;
  width: 40%;
`
export const TodoBtn = styled.button`
  font-size: 1rem;
  background: ${(props) => props.bgColor || "royalblue"};
  color: ${(props) => props.fontColor || "white"};
  border-radius: 4px;
  border-style: none;
  &:hover {
    cursor: pointer;
  }
`
