import TodoProvider from "@/context/todo-context/todo-context";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <TodoProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </TodoProvider>
    </SafeAreaProvider>
  );
}
