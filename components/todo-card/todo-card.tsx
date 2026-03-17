import { TodoActionType } from "@/context/todo-context/todo-action.enum";
import { useTodos } from "@/context/todo-context/todo-context";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TodoCardProps } from "./todo-card.types";

export default function TodoCard({ todo }: TodoCardProps) {
  const { todosDispatch } = useTodos();

  function handleDelete() {
    todosDispatch({
      type: TodoActionType.DELETE_TODO,
      payload: { id: todo.id },
    });
  }

  function handleEdit() {
    todosDispatch({
      type: TodoActionType.OPEN_UPDATE_TODO_MODAL,
      payload: { todo },
    });
  }

  return (
    <View
      style={[
        styles.todoContainer,
        todo.completed && styles.completedTodoContainer,
      ]}
    >
      <Text
        style={[styles.todoTitle, todo.completed && styles.completedTodoTitle]}
      >
        {todo.title}
      </Text>
      <Pressable
        style={[styles.deleteButton, styles.editButton]}
        onPress={handleEdit}
      >
        <Text style={styles.deleteButtonText}>Edit</Text>
      </Pressable>
      <Pressable style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  todoContainer: {
    padding: 14,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "rgb(5, 54, 133)",
    marginBottom: 18,
    backgroundColor: "rgb(210, 226, 252)",
    flexDirection: "row",
  },
  completedTodoContainer: {
    backgroundColor: "rgb(215, 215, 215)",
    borderColor: "rgb(107, 101, 107)",
  },
  todoTitle: {
    flexGrow: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "rgb(2, 19, 46)",
  },
  completedTodoTitle: {
    color: "rgb(142, 140, 156)",
    textDecorationLine: "line-through",
  },
  editButton: {
    backgroundColor: "rgb(71, 141, 245)",
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: "rgb(181, 11, 36)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  deleteButtonText: {
    fontSize: 12,
    color: "white",
  },
});
