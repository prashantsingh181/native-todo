import { ThemeTokens } from '@/constants/theme';
import { useTheme } from '@/context/theme-context/theme-context';
import { StyleSheet } from 'react-native';

export default function useThemeStyles<T extends StyleSheet.NamedStyles<T>>(
  fn: (colors: ThemeTokens) => T,
) {
  const { colors } = useTheme();
  return fn(colors);
}
