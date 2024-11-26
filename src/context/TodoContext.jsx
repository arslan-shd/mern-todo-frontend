import { createContext, useReducer } from "react";

export const TodosContext = createContext();

export const TodosContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todosReducer, {
    todos: null,
    filteredTodos: null,
    filters: {
      priority: null, // e.g., "high", "medium", "low"
      status: null, // e.g., "completed", "pending"
      dueDate: null, // e.g., "all", "dueToday", "overdue", "upcoming"
    },
  });
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
        ...state,
        todos: action.payload,
        filteredTodos: action.payload,
      };

    // case "CREATE_TODO":
    //   return {
    //     todos: [action.payload, ...state.todos],
    //   };

    case "CREATE_TODO":
      return {
        ...state,
        todos: [action.payload, ...state.todos],
        filteredTodos: [action.payload, ...state.filteredTodos],
      };

    // case "DELETE_TODO":
    //   return {
    //     todos: state.todos.filter((todo) => {
    //       return todo._id !== action.payload._id;
    //     }),
    //   };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => {
          return todo._id !== action.payload._id;
        }),
        filteredTodos: state.todos.filter((todo) => {
          return todo._id !== action.payload._id;
        }),
      };

    // case "UPDATE_TODO":
    //   return {
    //     todos: state.todos.map((todo) => {
    //       if (todo._id === action.payload._id) {
    //         return {
    //           ...todo,
    //           ...action.payload,
    //         };
    //       }
    //       return todo;
    //     }),
    //     filteredTodos: state.todos.map((todo) => {
    //       if (todo._id === action.payload._id) {
    //         return {
    //           ...todo,
    //           ...action.payload,
    //         };
    //       }
    //       return todo;
    //     }),
    //   };

    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo._id === action.payload._id) {
            return {
              ...todo,
              ...action.payload,
            };
          }
          return todo;
        }),
        filteredTodos: state.filteredTodos.map((todo) => {
          if (todo._id === action.payload._id) {
            return {
              ...todo,
              ...action.payload,
            };
          }
          return todo;
        }),
      };

    // case "CHANGE_TODO_STATUS":
    //   return {
    //     todos: state.todos
    //       .map((todo) => {
    //         if (todo._id === action.payload._id) {
    //           return {
    //             ...todo,
    //             status: todo.status === "completed" ? "pending" : "completed",
    //           };
    //         }
    //         return todo;
    //       })
    //       .sort((a, b) => {
    //         if (a.status === "pending" && b.status === "completed") {
    //           return -1; // "pending" comes before "completed"
    //         }
    //         if (a.status === "completed" && b.status === "pending") {
    //           return 1; // "completed" comes after "pending"
    //         }
    //         return 0; // No change if both statuses are the same
    //       }),
    //   };

    case "CHANGE_TODO_STATUS":
      return {
        ...state,
        todos: state.todos
          .map((todo) => {
            if (todo._id === action.payload._id) {
              return {
                ...todo,
                status: todo.status === "completed" ? "pending" : "completed",
              };
            }
            return todo;
          })
          .sort((a, b) => {
            if (a.status === "pending" && b.status === "completed") {
              return -1; // "pending" comes before "completed"
            }
            if (a.status === "completed" && b.status === "pending") {
              return 1; // "completed" comes after "pending"
            }
            return 0; // No change if both statuses are the same
          }),
        filteredTodos: state.filteredTodos
          .map((todo) => {
            if (todo._id === action.payload._id) {
              return {
                ...todo,
                status: todo.status === "completed" ? "pending" : "completed",
              };
            }
            return todo;
          })
          .sort((a, b) => {
            if (a.status === "pending" && b.status === "completed") {
              return -1; // "pending" comes before "completed"
            }
            if (a.status === "completed" && b.status === "pending") {
              return 1; // "completed" comes after "pending"
            }
            return 0; // No change if both statuses are the same
          }),
      };

    // case "FILTER_TODO_BY_STATUS":
    //   return {
    //     ...state,
    //     filteredTodos:
    //       action.payload === "all"
    //         ? state.todos // Always filter from the original list
    //         : state.todos.filter((todo) => todo.status === action.payload),
    //   };

    // case "FILTER_TODO_BY_PRIORITY":
    //   return {
    //     ...state,
    //     filteredTodos:
    //       action.payload === "all"
    //         ? state.todos // Always filter from the original list
    //         : state.todos.filter((todo) => todo.priority === action.payload),
    //   };

    // case "FILTER_TODO_BY_DATE":
    //   if (action.payload === "all") {
    //     return { ...state, filteredTodos: state.todos };
    //   } else if (action.payload === "dueToday") {
    //     return {
    //       ...state,
    //       filteredTodos: state.todos.filter((todo) => {
    //         const todoDueDate = new Date(todo.dueDate);
    //         const todoDateWithoutTime = new Date(
    //           todoDueDate.getFullYear(),
    //           todoDueDate.getMonth(),
    //           todoDueDate.getDate()
    //         );
    //         return todoDateWithoutTime.getTime() === todayDate.getTime();
    //       }),
    //     };
    //   } else if (action.payload === "overdue") {
    //     return {
    //       ...state,
    //       filteredTodos: state.todos.filter((todo) => {
    //         const todoDueDate = new Date(todo.dueDate);
    //         return todoDueDate < todayDate; // Overdue if the dueDate is before today
    //       }),
    //     };
    //   } else if (action.payload === "upcoming") {
    //     return {
    //       ...state,
    //       filteredTodos: state.todos.filter((todo) => {
    //         const todoDueDate = new Date(todo.dueDate);
    //         return todoDueDate > todayDate; // Upcoming if the dueDate is after today
    //       }),
    //     };
    //   } else {
    //     return {
    //       ...state,
    //       filteredTodos: state.todos,
    //     };
    //   }

    case "SET_PRIORITY_FILTER":
      return {
        ...state,
        filters: { ...state.filters, priority: action.payload },
      };

    case "SET_STATUS_FILTER":
      return {
        ...state,
        filters: { ...state.filters, status: action.payload },
      };

    case "SET_DUEDATE_FILTER":
      return {
        ...state,
        filters: { ...state.filters, dueDate: action.payload },
      };

    case "APPLY_FILTERS": {
      const todayDate = new Date();
      const todayDateWithoutTime = new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        todayDate.getDate()
      );
      const startOfTomorrow = new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        todayDate.getDate() + 1
      );

      const { priority, status, dueDate } = state.filters;

      // console.log(priority, status, dueDate, "Data in apply filters case");

      const filteredTodos = state.todos?.filter((todo) => {
        // Apply priority filter

        if (priority && todo.priority !== priority) return false;

        // Apply status filter
        if (status && todo.status !== status) return false;

        // Apply dueDate filter
        if (dueDate === "dueToday") {
          const todoDueDate = new Date(todo.dueDate);
          const todoDateWithoutTime = new Date(
            todoDueDate.getFullYear(),
            todoDueDate.getMonth(),
            todoDueDate.getDate()
          );
          if (todoDateWithoutTime.getTime() !== todayDateWithoutTime.getTime())
            return false;
        } else if (dueDate === "overdue") {
          const todoDueDate = new Date(todo.dueDate);
          if (todoDueDate >= todayDateWithoutTime) return false;
        } else if (dueDate === "upcoming") {
          const todoDueDate = new Date(todo.dueDate);
          if (todoDueDate < startOfTomorrow) return false;
        }

        return true; // Passes all filters
      });
      return {
        ...state,
        filteredTodos: filteredTodos || [], // Ensure a valid array
      };
    }

    default: {
      return state;
    }
  }
};
