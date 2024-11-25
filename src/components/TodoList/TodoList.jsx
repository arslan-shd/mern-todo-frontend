import Todo from "../Todo/Todo";
import "./todoList.css";

const TodoList = ({ todos, filteredTodos }) => {
  return (
    <div className="todo-list">
      <div className="todos">
        {filteredTodos.map((todo) => (
          <Todo todo={todo} key={todo._id} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
