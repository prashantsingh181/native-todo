import { demoTodos } from '@/constants';
import { StorageKeys } from '@/enums';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { TodoActionType } from './todo-action.enum';
import {
  TodoAction,
  TodoContextState,
  TodoContextType,
  TodoProviderProps,
} from './todo-context.types';

const TodoContext = createContext<TodoContextType>(null);

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};

function todoReducer(state: TodoContextState, action: TodoAction): TodoContextState {
  switch (action.type) {
    case TodoActionType.ADD_TODO: {
      const newTodo = {
        id: state.todos[0] ? state.todos[0].id + 1 : 1,
        ...action.payload,
      };
      return { ...state, todos: [newTodo, ...state.todos] };
    }
    case TodoActionType.UPDATE_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) => (todo.id === action.payload.id ? action.payload : todo)),
      };
    }
    case TodoActionType.DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    }
    case TodoActionType.REPLACE_TODOS: {
      return {
        ...state,
        todos: action.payload,
      };
    }
    case TodoActionType.OPEN_ADD_TODO_MODAL: {
      return {
        ...state,
        todoModal: { isOpen: true, type: 'add' },
      };
    }
    case TodoActionType.OPEN_UPDATE_TODO_MODAL: {
      return {
        ...state,
        todoModal: {
          isOpen: true,
          type: 'update',
          todo: action.payload.todo,
        },
      };
    }
    case TodoActionType.CLOSE_TODO_MODAL: {
      return {
        ...state,
        todoModal: { isOpen: false, type: 'add' },
      };
    }
    default:
      return state;
  }
}

export default function TodoProvider({ children }: Readonly<TodoProviderProps>) {
  const [state, todosDispatch] = useReducer(todoReducer, {
    todos: [],
    todoModal: { isOpen: false, type: 'add' },
  });

  useEffect(() => {
    const getTodosFromStorage = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem(StorageKeys.Todos);
        if (storedTodos) {
          todosDispatch({
            type: TodoActionType.REPLACE_TODOS,
            payload: JSON.parse(storedTodos),
          });
        } else {
          todosDispatch({
            type: TodoActionType.REPLACE_TODOS,
            payload: demoTodos,
          });
        }
      } catch (error) {
        console.error('Failed to load todos from storage', error);
      }
    };
    getTodosFromStorage();
  }, []);

  useEffect(() => {
    const saveTodosToStorage = async () => {
      try {
        await AsyncStorage.setItem(StorageKeys.Todos, JSON.stringify(state.todos));
      } catch (error) {
        console.error('Failed to save todos to storage', error);
      }
    };
    saveTodosToStorage();
  }, [state.todos]);

  return <TodoContext value={{ state, todosDispatch }}>{children}</TodoContext>;
}
