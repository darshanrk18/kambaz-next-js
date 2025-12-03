"use client";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { Button } from "react-bootstrap";

export default function TodoItem({
  todo,
}: {
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();
  return (
    <div className="d-flex justify-content-between align-items-center p-3 bg-white rounded border mb-3">
      <span>{todo.title}</span>
      <div className="d-flex gap-2">
        <Button
          onClick={() => dispatch(setTodo(todo))}
          id="wd-set-todo-click"
          variant="primary"
        >
          Edit
        </Button>
        <Button
          onClick={() => dispatch(deleteTodo(todo.id))}
          id="wd-delete-todo-click"
          variant="danger"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}