import { useState, useEffect } from "react";
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

  // const convertUtcToLocal = () => {
  //   const utcDate = new Date(todo.reminder);
  //   return utcDate.toLocaleString(); // Converts the UTC time to the local time zone
  // };

  const [task, setTask] = useState(todo.title);
  const [reminderTime, setReminderTime] = useState(todo.reminder); // Example reminder time (local)

  // Check if notification permission is granted when the component mounts
  useEffect(() => {
    if (Notification.permission !== "granted") {
      // Request permission if not already granted
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted");
        }
      });
    }
  }, []);

  // Function to show a notification
  const triggerNotification = () => {
    if (Notification.permission === "granted") {
      new Notification("Reminder", { body: `Task "${task}" is due!` });
    }
  };

  // Example: Trigger a notification when the reminder time arrives
  useEffect(() => {
    const reminderDateTime = new Date(reminderTime);
    console.log("reminderDateTime: " + reminderDateTime);
    console.log("reminderTime: " + reminderTime);
    const currentTime = new Date();

    console.log("currentTime: " + currentTime);

    // If the reminder time is in the future, set a timeout to show the notification
    if (reminderDateTime > currentTime) {
      console.log("I ran inside if block in remindeer Date time");
      const timeout = reminderDateTime - currentTime;
      const reminderTimeout = setTimeout(() => {
        triggerNotification();
      }, timeout);

      // Cleanup the timeout if the component is unmounted
      return () => clearTimeout(reminderTimeout);
    }
  }, [reminderTime]);

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

    console.log(json);

    if (response.ok) {
      setIsMarkingComplete(false);
      dispatch({ type: "CHANGE_TODO_STATUS", payload: json.data.todo });
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
          {todo?.reminder}
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
          </div>
        </div>
        <p className="todo-created-at">
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
