import { useTodosContext } from "../../hooks/useTodosContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../../hooks/useAuthContext";
import highPriorityFlag from "../../assets/flag-high.svg";
import mediumPriorityFlag from "../../assets/flag-medium.svg";
import lowPriorityFlag from "../../assets/flag-low.svg";
import "./todo.css";

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

  const handleMarkComplete = async (todo) => {
    console.log("complete button clicked");
    if (!user) {
      return;
    }

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

    console.log(json);

    if (response.ok) {
      dispatch({ type: "UPDATE_TODO", payload: json.data.todo });
    }
  };

  return (
    <div
      className={`todo-card ${todo.status === "completed" ? "completed" : ""}`}
    >
      <div className="card-content">
        <h3 className="todo-title">{todo.title}</h3>
        <p className="todo-description">{todo.description}</p>
        <div className="divider"></div>
        <div className="todo-tags">
          {/* <div
            className={`priority-tag ${
              todo.priority === "high"
                ? "priority-high"
                : todo.priority === "medium"
                ? "priority-medium"
                : "priority-low"
            }`}
          >
            {todo.priority}
          </div> */}

          <div className="due-date-tag">
            {new Date(todo.dueDate).toLocaleString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
          <div className={"priority-tag"}>
            {todo.priority === "high" && (
              <img
                style={{ width: "30px", height: "30px" }}
                src={highPriorityFlag}
              />
            )}
            {todo.priority === "medium" && (
              <img
                style={{ width: "30px", height: "30px" }}
                src={mediumPriorityFlag}
              />
            )}
            {todo.priority === "low" && (
              <img
                style={{ width: "30px", height: "30px" }}
                src={lowPriorityFlag}
              />
            )}
          </div>
        </div>
        <p className="todo-created-at">
          {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}
        </p>
      </div>
      <div className="todo-actions">
        {todo.status === "completed" ? (
          <button
            onClick={() => handleMarkComplete(todo)}
            className="check-btn"
          >
            <i className="fas fa-undo"></i>
          </button>
        ) : (
          <button
            onClick={() => handleMarkComplete(todo)}
            className="check-btn"
          >
            <i className="fas fa-check"></i>
          </button>
        )}
        <button onClick={() => handleDelete(todo)} className="delete-btn">
          <i className="fas fa-trash-alt"></i>
        </button>
        <button className="update-btn">
          <i className="fas fa-pen"></i>
        </button>
      </div>
    </div>
  );
};

export default Todo;
