import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#2196F3',
        secondary: '#03DAC6',
        error: '#B00020',
        background: '#F5F5F5',
        surface: '#FFFFFF',
        onPrimary: '#FFFFFF',
        onSecondary: '#000000',
        onBackground: '#1C1B1F',
        onSurface: '#1C1B1F',
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },
};
