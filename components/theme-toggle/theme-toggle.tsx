import { ThemeTokens } from '@/constants/theme';
import { useTheme } from '@/context/theme-context/theme-context';
import { Theme } from '@/enums/themes';
import useThemeStyles from '@/hooks/useThemeStyles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet } from 'react-native';

export default function ThemeToggle() {
  const { setTheme, isDarkMode } = useTheme();
  const styles = useThemeStyles(createStyles);
  return (
    <Pressable
      style={styles.themeButton}
      onPress={() => setTheme((prevTheme) => (prevTheme === Theme.Dark ? Theme.Light : Theme.Dark))}
    >
      {isDarkMode ? (
        <MaterialIcons name="light-mode" size={32} color="black" />
      ) : (
        <MaterialIcons name="dark-mode" size={32} color="black" />
      )}
    </Pressable>
  );
}

const createStyles = (colors: ThemeTokens) => {
  const styles = StyleSheet.create({
    themeButton: {
      padding: 8,
      borderWidth: 1,
      borderRadius: '50%',
      alignSelf: 'flex-end',
      backgroundColor: colors.buttonBackground,
      marginBottom: 16,
    },
  });
  return styles;
};
