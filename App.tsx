import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { MainNavigator } from './src/navigation/MainNavigator';
import { initDb } from './src/utils/db';
import { theme } from './src/utils/theme';

const queryClient = new QueryClient();

export default function App() {
    useEffect(() => {
        initDb();
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <PaperProvider theme={theme}>
                <NavigationContainer>
                    <StatusBar style="light" />
                    <MainNavigator />
                </NavigationContainer>
            </PaperProvider>
        </QueryClientProvider>
    );
}
