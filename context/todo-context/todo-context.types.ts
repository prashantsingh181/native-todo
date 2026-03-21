import { TodoActionType } from './todo-action.enum';

export interface Todo {
  completed: boolean;
  id: number;
  title: string;
}

export interface TodoProviderProps {
  children: React.ReactNode;
}

export type TodoContextState = {
  todos: Todo[];
  todoModal: TodoAddModal | TodoUpdateModal;
};
export type TodoContextType = {
  state: TodoContextState;
  todosDispatch: React.Dispatch<TodoAction>;
} | null;

interface TodoAddModal {
  isOpen: boolean;
  type: 'add';
}

interface TodoUpdateModal {
  isOpen: boolean;
  type: 'update';
  todo: Todo;
}

interface AddTodoAction {
  type: TodoActionType.ADD_TODO;
  payload: Omit<Todo, 'id'>;
}

interface UpdateTodoAction {
  type: TodoActionType.UPDATE_TODO;
  payload: Todo;
}

interface DeleteTodoAction {
  type: TodoActionType.DELETE_TODO;
  payload: { id: number };
}

interface ReplaceTodosAction {
  type: TodoActionType.REPLACE_TODOS;
  payload: Todo[];
}

interface OpenAddTodoModalAction {
  type: TodoActionType.OPEN_ADD_TODO_MODAL;
  payload: null;
}

interface OpenUpdateTodoModalAction {
  type: TodoActionType.OPEN_UPDATE_TODO_MODAL;
  payload: { todo: Todo };
}

interface CloseTodoModalAction {
  type: TodoActionType.CLOSE_TODO_MODAL;
  payload: null;
}

export type TodoAction =
  | AddTodoAction
  | UpdateTodoAction
  | DeleteTodoAction
  | ReplaceTodosAction
  | OpenAddTodoModalAction
  | OpenUpdateTodoModalAction
  | CloseTodoModalAction;
