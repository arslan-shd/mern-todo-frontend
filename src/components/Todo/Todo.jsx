import { useState } from "react";
import { useTodosContext } from "../../hooks/useTodosContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../../hooks/useAuthContext";
import highPriorityFlag from "../../assets/flag-high.svg";
import mediumPriorityFlag from "../../assets/flag-medium.svg";
import StatusMessage from "../StatusMessage/StatusMessage";
import Modal from "../Modal/Modal";
import "./todo.css";

const Todo = ({ todo }) => {
  const [isMarkingComplete, setIsMarkingComplete] = useState(false);
  const [isDeletingTodo, setIsDeletingTodo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { dispatch } = useTodosContext();
  const { user } = useAuthContext();

  const handleDelete = async (todo) => {
    if (!user) {
      return;
    }
    setIsDeletingTodo(true);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/todos/${todo._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (response.ok) {
      setIsDeletingTodo(false);
      dispatch({ type: "DELETE_TODO", payload: todo });
      dispatch({ type: "APPLY_FILTERS" }); // Apply filters after updating status
    }
  };

  const handleMarkComplete = async (todo) => {
    console.log("complete button clicked");
    if (!user) {
      return;
    }

    setIsMarkingComplete(true);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/todos/${todo._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          status: todo.status === "completed" ? "pending" : "completed",
        }),
      }
    );

    const json = await response.json();

    // console.log(json);

    if (response.ok) {
      setIsMarkingComplete(false);
      dispatch({ type: "CHANGE_TODO_STATUS", payload: json.data.todo });
      dispatch({ type: "APPLY_FILTERS" }); // Apply filters after updating status
    }
  };

  const handleUpdate = () => {
    setShowModal(true);
  };

  return (
    <div
      className={`todo-card ${todo.status === "completed" ? "completed" : ""}`}
    >
      {showModal && <Modal setShowModal={setShowModal} todo={todo} />}
      <div className="card-content">
        <h3 className="todo-title">{todo.title}</h3>
        <p className="todo-description">{todo.description}</p>
        <div className="divider"></div>
        <div className="todo-tags">
          <div className="due-date-tag">
            {new Date(todo.dueDate).toLocaleString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
          {/* {todo?.reminder} */}
          <div className={"priority-tag"}>
            {todo.priority === "high" && (
              <img className="priority-flag-img" src={highPriorityFlag} />
            )}
            {todo.priority === "medium" && (
              <img className="priority-flag-img" src={mediumPriorityFlag} />
            )}
          </div>
          {todo.reminder && (
            <div className="reminder-tag">
              <i className="fa-solid fa-stopwatch"></i>
            </div>
          )}
        </div>
        <p className="todo-created-at">
          Created{" "}
          {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}
        </p>
        {isMarkingComplete && (
          <StatusMessage
            status={
              todo.status === "completed"
                ? "Unmarking todo as completed..."
                : "Marking todo as completed..."
            }
            textColor={todo.status === "completed" && "text-red"}
          />
        )}
        {isDeletingTodo && (
          <StatusMessage status="Deleting todo..." textColor="text-red" />
        )}
      </div>
      <div className="todo-actions">
        {todo.status === "completed" ? (
          <button
            onClick={() => handleMarkComplete(todo)}
            className="icon-btn undo-btn"
          >
            <i className="fas fa-undo"></i>
          </button>
        ) : (
          <button
            onClick={() => handleMarkComplete(todo)}
            className="icon-btn check-btn"
          >
            <i className="fas fa-check"></i>
          </button>
        )}
        <button
          onClick={() => handleDelete(todo)}
          className="icon-btn delete-btn"
        >
          <i className="fas fa-trash-alt"></i>
        </button>
        <button className="icon-btn update-btn" onClick={handleUpdate}>
          <i className="fas fa-pen"></i>
        </button>
      </div>
    </div>
  );
};

export default Todo;
