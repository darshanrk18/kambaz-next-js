"use client";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { Button, Form } from "react-bootstrap";

export default function TodoForm() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <div className="d-flex align-items-center gap-2 p-3 bg-white rounded border mb-3">
      <Form.Control
        value={todo?.title || ""}
        onChange={(e) =>
          dispatch(setTodo({ ...todo, title: e.target.value }))
        }
        className="flex-grow-1"
      />
      <Button
        onClick={() => dispatch(updateTodo(todo))}
        id="wd-update-todo-click"
        variant="warning"
      >
        Update
      </Button>
      <Button
        onClick={() => dispatch(addTodo(todo))}
        id="wd-add-todo-click"
        variant="success"
      >
        Add
      </Button>
    </div>
  );
}