import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

export const lightTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#2196F3',
        secondary: '#03DAC6',
        error: '#B00020',
        background: '#F5F5F5',
        surface: '#FFFFFF',
        onPrimary: '#FFFFFF',
        onSecondary: '#000000',
        onBackground: '#1C1B1F',
        onSurface: '#1C1B1F',
        onSurfaceVariant: '#49454F',
    },
};

export const darkTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#90CAF9',
        secondary: '#03DAC6',
        error: '#CF6679',
        background: '#121212',
        surface: '#1E1E1E',
        onPrimary: '#000000',
        onSecondary: '#000000',
        onBackground: '#FFFFFF',
        onSurface: '#FFFFFF',
        onSurfaceVariant: '#CAC4D0',
    },
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
};
