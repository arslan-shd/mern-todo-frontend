import { useTodosContext } from "../../hooks/useTodosContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import "./todo.css";
import { useAuthContext } from "../../hooks/useAuthContext";

const Todo = ({ todo }) => {
  const { dispatch } = useTodosContext();
  const { user } = useAuthContext();

  const handleDelete = async (todo) => {
    if (!user) {
      return;
    }
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
      dispatch({ type: "DELETE_TODO", payload: todo });
    }
  };

  return (
    <div className="todo">
      <div className="details">
        <h3 className="todo-name">{todo.title}</h3>
        <p className="todo-description">{todo.description}</p>
        <div className="todo-tags">
          <div
            className={`todo-priority ${
              todo.priority === "high"
                ? "priority-high"
                : todo.priority === "medium"
                ? "priority-medium"
                : "priority-low"
            }`}
          >
            {todo.priority}
          </div>
          <div className="todo-due-date">
            {new Date(todo.dueDate).toLocaleString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>
        <p className="todo-created-at">
          {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}
        </p>
      </div>
      <div className="todo-actions">
        <button
          className="btn-actions btn-delete"
          onClick={() => handleDelete(todo)}
        >
          Delete
        </button>
        <button className="btn-actions btn-update">Update</button>
      </div>
    </div>
  );
};

export default Todo;
