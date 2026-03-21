import { Font } from '@/constants/fonts';
import { lightTheme } from '@/constants/theme';
import { TodoActionType } from '@/context/todo-context/todo-action.enum';
import { useTodos } from '@/context/todo-context/todo-context';
import useThemeStyles from '@/hooks/useThemeStyles';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TodoCardProps } from './todo-card.types';

export default function TodoCard({ todo }: Readonly<TodoCardProps>) {
  const { todosDispatch } = useTodos();
  const styles = useThemeStyles(createStyles);

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
    <View style={[styles.todoContainer, todo.completed && styles.completedTodoContainer]}>
      <Text style={[styles.todoTitle, todo.completed && styles.completedTodoTitle]}>
        {todo.title}
      </Text>
      <Pressable style={[styles.deleteButton, styles.editButton]} onPress={handleEdit}>
        <Text style={styles.deleteButtonText}>Edit</Text>
      </Pressable>
      <Pressable style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
    </View>
  );
}

const createStyles = (colors: typeof lightTheme) => {
  const styles = StyleSheet.create({
    todoContainer: {
      padding: 14,
      borderWidth: 1,
      borderRadius: 12,
      borderColor: colors.cardBorder,
      marginBottom: 18,
      backgroundColor: colors.cardBackground,
      flexDirection: 'row',
    },
    completedTodoContainer: {
      backgroundColor: colors.completedCardBackground,
      borderColor: colors.completedCardBorder,
    },
    todoTitle: {
      flexGrow: 1,
      fontSize: 16,
      fontFamily: Font.MonoBoldItalic,
      color: colors.text,
    },
    completedTodoTitle: {
      color: colors.completedText,
      textDecorationLine: 'line-through',
    },
    editButton: {
      backgroundColor: 'rgb(71, 141, 245)',
      marginRight: 8,
      justifyContent: 'center',
    },
    deleteButton: {
      backgroundColor: 'rgb(181, 11, 36)',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      justifyContent: 'center',
    },
    deleteButtonText: {
      fontSize: 12,
      color: 'white',
    },
  });
  return styles;
};
