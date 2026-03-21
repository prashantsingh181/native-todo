import { Font } from '@/constants/fonts';
import ThemeProvider, { useTheme } from '@/context/theme-context/theme-context';
import TodoProvider from '@/context/todo-context/todo-context';
import { Theme } from '@/enums/themes';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const [loaded, error] = useFonts({
    [Font.MonoBold]: require('@/assets/fonts/IosevkaCharonMono-Bold.ttf'),
    [Font.MonoBoldItalic]: require('@/assets/fonts/IosevkaCharonMono-BoldItalic.ttf'),
    [Font.MonoItalic]: require('@/assets/fonts/IosevkaCharonMono-Italic.ttf'),
    [Font.MonoLight]: require('@/assets/fonts/IosevkaCharonMono-Light.ttf'),
    [Font.MonoLightItalic]: require('@/assets/fonts/IosevkaCharonMono-LightItalic.ttf'),
    [Font.MonoMedium]: require('@/assets/fonts/IosevkaCharonMono-Medium.ttf'),
    [Font.MonoMediumItalic]: require('@/assets/fonts/IosevkaCharonMono-MediumItalic.ttf'),
    [Font.MonoRegular]: require('@/assets/fonts/IosevkaCharonMono-Regular.ttf'),
  });

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <TodoProvider>
          <RootComponent />
        </TodoProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function RootComponent() {
  const { theme } = useTheme();

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar barStyle={theme === Theme.Dark ? 'light-content' : 'dark-content'} />
    </>
  );
}
