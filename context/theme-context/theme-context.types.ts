import { lightTheme } from '@/constants/theme';
import { Theme } from '@/enums';

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export type ThemeContextType = {
  isDarkMode: boolean;
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  colors: typeof lightTheme;
} | null;
