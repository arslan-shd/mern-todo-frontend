import Todo from "../Todo/Todo";
import "./todoList.css";

const TodoList = ({ todos }) => {
  return (
    <div className="todo-list">
      {/* <h2 className="title">Your Todos</h2> */}
      <div className="todos">
        {todos.map((todo) => (
          <Todo todo={todo} key={todo._id} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
