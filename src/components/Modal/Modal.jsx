import { useState } from "react";
import "./modal.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useTodosContext } from "../../hooks/useTodosContext";

const Modal = ({ setShowModal, todo }) => {
  const dateString = todo.dueDate;
  const date = new Date(dateString);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${yyyy}-${mm}-${dd}`;

  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [priority, setPriority] = useState(todo.priority);
  const [dueDate, setDueDate] = useState(formattedDate);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();
  const { dispatch } = useTodosContext();

  const updateTodo = async (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }

    // console.log("printing form update todo in modal", todo);
    setIsLoading(true);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/todos/${todo._id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ title, description, priority, dueDate }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      setIsLoading(false);
      dispatch({ type: "UPDATE_TODO", payload: json.data.todo });
      setShowModal(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <form onSubmit={(e) => updateTodo(e)}>
          <div className="form-header">
            <h2 className="form-title">Update Todo</h2>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              <i className="fa fa-xmark"></i>
            </button>
          </div>

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
          </fieldset>
          <button disabled={isLoading} className="submit-btn">
            Update
          </button>
          {error && <ErrorMessage error={error} />}
        </form>
      </div>
    </div>
  );
};

export default Modal;
