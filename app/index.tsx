import ThemeToggle from '@/components/theme-toggle/theme-toggle';
import TodoCard from '@/components/todo-card/todo-card';
import TodoModal from '@/components/todo-modal/todo-modal';
import { lightTheme } from '@/constants/theme';
import { TodoActionType } from '@/context/todo-context/todo-action.enum';
import { useTodos } from '@/context/todo-context/todo-context';
import useThemeStyles from '@/hooks/useThemeStyles';
import { useState } from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const { state, todosDispatch } = useTodos();
  const [searchTerm, setSearchTerm] = useState('');
  const visibleTodos = state.todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );
  const [refreshing, setRefreshing] = useState(false);
  const styles = useThemeStyles(createStyles);

  function handleRefresh() {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemeToggle />
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
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
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      />
      <TodoModal />
    </SafeAreaView>
  );
}
const createStyles = (colors: typeof lightTheme) => {
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, padding: 12 },
    searchTextInput: {
      padding: 12,
      borderWidth: 1,
      borderRadius: 12,
      fontSize: 14,
      flexGrow: 1,
      borderColor: colors.cardBorder,
      color: colors.text,
    },
    addTodoButton: {
      backgroundColor: 'rgb(71, 141, 245)',
      paddingHorizontal: 16,
      paddingVertical: 4,
      borderRadius: 6,
      justifyContent: 'center',
    },
    addTodoButtonText: {
      fontSize: 14,
      fontWeight: 600,
      color: 'white',
    },
  });
  return styles;
};
