import { useAuthContext } from "./useAuthContext";
import { useTodosContext } from "./useTodosContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: todoDispatch } = useTodosContext();

  const logout = () => {
    // remove user from local storage
    localStorage.removeItem("user");

    //update global state to logout action
    dispatch({ type: "LOGOUT" });
    todoDispatch({ type: "SET_TODOS", payload: null });
  };

  return logout;
};
