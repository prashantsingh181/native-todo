import TodoCard from "@/components/todo-card/todo-card";
import TodoModal from "@/components/todo-modal/todo-modal";
import { TodoActionType } from "@/context/todo-context/todo-action.enum";
import { useTodos } from "@/context/todo-context/todo-context";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { state, todosDispatch } = useTodos();
  const [searchTerm, setSearchTerm] = useState("");
  const visibleTodos = state.todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", gap: 12, marginBottom: 16 }}>
        <TextInput
          style={styles.searchTextInput}
          placeholder="Search Todos..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <Pressable
          style={styles.addTodoButton}
          onPress={() =>
            todosDispatch({
              type: TodoActionType.OPEN_ADD_TODO_MODAL,
              payload: null,
            })
          }
        >
          <Text style={styles.addTodoButtonText}>Add</Text>
        </Pressable>
      </View>
      <FlatList
        data={visibleTodos}
        renderItem={({ item }) => <TodoCard todo={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <TodoModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "aliceblue", padding: 12 },
  searchTextInput: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
    fontSize: 14,
    flexGrow: 1,
  },
  addTodoButton: {
    backgroundColor: "rgb(71, 141, 245)",
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 6,
    justifyContent: "center",
  },
  addTodoButtonText: {
    fontSize: 14,
    fontWeight: 600,
    color: "white",
  },
});
