import { createContext, useContext, useReducer } from "react";
import { TodoActionType } from "./todo-action.enum";
import {
  TodoAction,
  TodoContextState,
  TodoContextType,
} from "./todo-context.types";

const TodoContext = createContext<TodoContextType>(null);

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};

function todoReducer(
  state: TodoContextState,
  action: TodoAction,
): TodoContextState {
  switch (action.type) {
    case TodoActionType.ADD_TODO:
      const newTodo = {
        id: state.todos[0] ? state.todos[0].id + 1 : 1,
        ...action.payload,
      };
      return { ...state, todos: [newTodo, ...state.todos] };
    case TodoActionType.UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo,
        ),
      };
    case TodoActionType.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case TodoActionType.OPEN_ADD_TODO_MODAL:
      return {
        ...state,
        todoModal: { isOpen: true, type: "add" },
      };
    case TodoActionType.OPEN_UPDATE_TODO_MODAL:
      return {
        ...state,
        todoModal: {
          isOpen: true,
          type: "update",
          todo: action.payload.todo,
        },
      };
    case TodoActionType.CLOSE_TODO_MODAL:
      return {
        ...state,
        todoModal: { isOpen: false, type: "add" },
      };
    default:
      return state;
  }
}

export default function TodoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, todosDispatch] = useReducer(todoReducer, {
    todos: [
      { id: 3, title: "Learn React Native", completed: false },
      { id: 2, title: "Build a Todo App", completed: false },
      { id: 1, title: "Master Context API", completed: true },
    ],
    todoModal: { isOpen: false, type: "add" },
  });
  return <TodoContext value={{ state, todosDispatch }}>{children}</TodoContext>;
}
