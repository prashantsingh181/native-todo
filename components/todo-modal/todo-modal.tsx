import { TodoActionType } from "@/context/todo-context/todo-action.enum";
import { useTodos } from "@/context/todo-context/todo-context";
import { useEffect, useMemo, useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TodoModal() {
  const { state, todosDispatch } = useTodos();
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  const isUpdateMode = state.todoModal.type === "update";
  const actionTitle = useMemo(
    () => (isUpdateMode ? "Edit Todo" : "Add Todo"),
    [isUpdateMode],
  );

  function handleClose() {
    todosDispatch({ type: TodoActionType.CLOSE_TODO_MODAL, payload: null });
  }

  function handleSubmit() {
    const normalizedTitle = title.trim();
    if (!normalizedTitle) return;

    if (state.todoModal.type === "add") {
      todosDispatch({
        type: TodoActionType.ADD_TODO,
        payload: { title: normalizedTitle, completed },
      });
    } else {
      todosDispatch({
        type: TodoActionType.UPDATE_TODO,
        payload: {
          id: state.todoModal.todo.id,
          title: normalizedTitle,
          completed,
        },
      });
    }

    handleClose();
  }

  useEffect(() => {
    if (!state.todoModal.isOpen) {
      setTitle("");
      setCompleted(false);
      return;
    }

    if (state.todoModal.type === "update") {
      setTitle(state.todoModal.todo.title);
      setCompleted(state.todoModal.todo.completed);
      return;
    }

    setTitle("");
    setCompleted(false);
  }, [state.todoModal]);

  const isSubmitDisabled = !title.trim();

  return (
    <Modal
      visible={state.todoModal.isOpen}
      onRequestClose={handleClose}
      animationType="fade"
      transparent
    >
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <SafeAreaView style={styles.safeAreaView}>
          <Pressable style={styles.backdrop} onPress={handleClose} />

          <View style={styles.modalCard}>
            <Text style={styles.title}>{actionTitle}</Text>
            <Text style={styles.subtitle}>
              {isUpdateMode
                ? "Update the title or completion status"
                : "Create a new task for your list"}
            </Text>

            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Buy groceries"
              value={title}
              onChangeText={setTitle}
              autoFocus
            />

            <Pressable
              style={[
                styles.statusToggle,
                completed && styles.statusToggleDone,
              ]}
              onPress={() => setCompleted((prev) => !prev)}
            >
              <Text style={styles.statusToggleText}>
                {completed ? "Marked as completed" : "Mark as completed"}
              </Text>
            </Pressable>

            <View style={styles.footerActions}>
              <Pressable style={styles.cancelButton} onPress={handleClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.submitButton,
                  isSubmitDisabled && styles.submitButtonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={isSubmitDisabled}
              >
                <Text style={styles.submitButtonText}>
                  {isUpdateMode ? "Update" : "Add"}
                </Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: { flex: 1 },
  safeAreaView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(3, 21, 47, 0.45)",
  },
  modalCard: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 26,
    borderWidth: 1,
    borderColor: "rgb(184, 205, 239)",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "rgb(5, 41, 95)",
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 18,
    color: "rgb(72, 96, 136)",
    fontSize: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
    color: "rgb(17, 53, 110)",
  },
  input: {
    borderWidth: 1,
    borderColor: "rgb(174, 199, 237)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 15,
    backgroundColor: "rgb(246, 250, 255)",
    marginBottom: 14,
  },
  statusToggle: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgb(148, 177, 222)",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "rgb(237, 244, 255)",
    marginBottom: 20,
  },
  statusToggleDone: {
    borderColor: "rgb(77, 153, 106)",
    backgroundColor: "rgb(231, 249, 237)",
  },
  statusToggleText: {
    color: "rgb(14, 57, 126)",
    fontWeight: "600",
    fontSize: 13,
  },
  footerActions: {
    flexDirection: "row",
    gap: 10,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "rgb(172, 189, 215)",
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
    flex: 1,
    backgroundColor: "rgb(250, 252, 255)",
  },
  cancelButtonText: {
    color: "rgb(63, 86, 123)",
    fontWeight: "600",
  },
  submitButton: {
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
    flex: 1,
    backgroundColor: "rgb(32, 105, 229)",
  },
  submitButtonDisabled: {
    opacity: 0.45,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "700",
  },
});
