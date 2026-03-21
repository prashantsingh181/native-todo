import { darkTheme, lightTheme } from '@/constants';
import { StorageKeys, Theme } from '@/enums';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeContextType, ThemeProviderProps } from './theme-context.types';

const ThemeContext = createContext<ThemeContextType>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default function ThemeProvider({ children }: Readonly<ThemeProviderProps>) {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(
    colorScheme && colorScheme === 'dark' ? Theme.Dark : Theme.Light,
  );
  const isDarkMode = theme === Theme.Dark;
  const colors = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const getThemeFromStorage = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(StorageKeys.Theme);
        if (storedTheme) {
          setTheme(storedTheme as Theme);
        }
      } catch (error) {
        console.error('Failed to load theme from storage', error);
      }
    };
    getThemeFromStorage();
  }, []);

  useEffect(() => {
    const saveThemeToStorage = async () => {
      try {
        await AsyncStorage.setItem(StorageKeys.Theme, theme);
      } catch (error) {
        console.error('Failed to save theme to storage', error);
      }
    };
    saveThemeToStorage();
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ isDarkMode, theme, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}
