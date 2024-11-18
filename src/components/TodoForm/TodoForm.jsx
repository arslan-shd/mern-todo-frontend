import { useState } from "react";
import { useTodosContext } from "../../hooks/useTodosContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
// import DateTimePicker from "react-datetime-picker";
// import "react-datetime-picker/dist/DateTimePicker.css";
// import "react-calendar/dist/Calendar.css";
// import "react-clock/dist/Clock.css";
// import { parse } from "date-fns";
// import { format, utcToZonedTime } from "date-fns-tz";
import "./todoForm.css";

const TodoForm = () => {
  const { dispatch } = useTodosContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");
  const [reminder, setReminder] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in.");
      return;
    }

    setIsLoading(true);

    const todo = {
      title,
      description,
      priority,
      dueDate,
      reminder: reminder ? new Date(reminder).toISOString() : "",
    };

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/todos`,
      {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(response.error);
    }

    if (response.ok) {
      setTitle("");
      setDescription("");
      setPriority("");
      setDueDate("");
      setReminder("");
      setError(null);
      setIsLoading(false);
      dispatch({ type: "CREATE_TODO", payload: json.data.todos });
    }
  };

  return (
    <div className="todo-form">
      <form onSubmit={handleSubmit}>
        <h2 className="form-title">Create A Todo</h2>
        <fieldset>
          <div className="field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              maxLength={40}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              type="text"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              maxLength={60}
            />
          </div>
          <div className="field">
            <label htmlFor="priority">Select Priority</label>
            <select
              name=""
              id="priority"
              onChange={(e) => setPriority(e.target.value)}
              value={priority}
            >
              {/* <option>Select priority</option> */}
              <option value="low">Low</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="due-date">Select Due Date</label>
            <input
              id="due-date"
              type="date"
              placeholder="Due Date"
              onChange={(e) => setDueDate(e.target.value)}
              value={dueDate}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="reminder">Add a reminder</label>
            <input
              type="datetime-local"
              value={reminder}
              onChange={(e) => setReminder(e.target.value)}
              name="reminder"
            />
          </div>
        </fieldset>
        <button disabled={isLoading} className="submit-btn">
          Add Todo
        </button>
        {error && <ErrorMessage error={error} />}
      </form>
      {/* Reminder set to:  2024-11-18T21:30 */}
    </div>
  );
};

export default TodoForm;
