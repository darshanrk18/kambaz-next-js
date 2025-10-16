import { ListGroup } from "react-bootstrap";
import TodoItem from "./TodoItem";
import todos from "./todos.json";

export default function TodoList() {
  return (
    <>
      <h3>Todo List</h3>
      <ListGroup>
        {todos.map((todo, idx) => {
          return <TodoItem key={idx} todo={todo} />;
        })}
      </ListGroup>
      <hr />
    </>
  );
}