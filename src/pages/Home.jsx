import { useEffect, useState } from "react";
import TodoForm from "../components/TodoForm/TodoForm";
import TodoList from "../components/TodoList/TodoList";
import { useTodosContext } from "../hooks/useTodosContext";
import relaxIcon from "../assets/relax-icon.svg";
import { useAuthContext } from "../hooks/useAuthContext";
import loaderPlant from "../assets/loader-plant.gif";
import "./home.css";

const Home = () => {
  const [areTodosLoading, setAreTodosLoading] = useState(false);

  const { todos, dispatch } = useTodosContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchTodos = async () => {
      setAreTodosLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/todos`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        setAreTodosLoading(false);
        dispatch({ type: "SET_TODOS", payload: json.data.todos });
      }
    };

    if (user) {
      fetchTodos();
    }
  }, [dispatch, user]);

  return (
    <main className={todos?.length > 0 ? "" : "main-empty"}>
      <TodoForm />
      {todos?.length > 0 && !areTodosLoading ? (
        <div>
          <h2 className="title">Your Todos</h2>
          <TodoList todos={todos} />
        </div>
      ) : !todos?.length > 0 && !areTodosLoading ? (
        <div className="relax-container">
          <img className="relax-icon" src={relaxIcon} alt="" />
          <p className="relax-text">
            You have no tasks. <br />
            Enjoy your coffee time!
          </p>
        </div>
      ) : (
        <div className="relax-container">
          <img src={loaderPlant} className="loader" alt="" />
        </div>
      )}

      {/* {console.log(todos)} */}
    </main>
  );
};

export default Home;
