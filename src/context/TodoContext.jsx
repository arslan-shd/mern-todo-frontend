import { createContext, useReducer } from "react";

export const TodosContext = createContext();

export const TodosContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todosReducer, { todos: null });
  console.log("TodosContext: ", state);

  return (
    <TodosContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

export const todosReducer = (state, action) => {
  switch (action.type) {
    case "SET_TODOS":
      return {
        todos: action.payload,
      };
    case "CREATE_TODO":
      return {
        todos: [action.payload, ...state.todos],
      };
    case "DELETE_TODO":
      return {
        todos: state.todos.filter((todo) => {
          return todo._id !== action.payload._id;
        }),
      };
    default: {
      return state;
    }
  }
};
