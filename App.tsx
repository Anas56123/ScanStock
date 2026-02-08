import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Provider as PaperProvider } from 'react-native-paper';
import { supabase } from './src/api/supabase';
import { MainNavigator } from './src/navigation/MainNavigator';
import { useStore } from './src/store';
import { initDb } from './src/utils/db';
import { darkTheme, lightTheme } from './src/utils/theme';

const queryClient = new QueryClient();

export default function App() {
    const { isDarkMode, setUser, setSession, setRole } = useStore();
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        // Initialize SQlite DB
        initDb();

        // Check initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setSession(session);
                setUser(session.user);
                setRole(session.user.user_metadata?.role || 'customer');
            }
            setInitializing(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setRole(session?.user?.user_metadata?.role || null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const theme = isDarkMode ? darkTheme : lightTheme;
    if (initializing) {
        return (
            <View style={[styles.loader, { backgroundColor: theme.colors.background }]}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    return (
        <QueryClientProvider client={queryClient}>
            <PaperProvider theme={theme}>
                <NavigationContainer theme={theme as any}>
                    <StatusBar style={isDarkMode ? 'light' : 'dark'} />
                    <MainNavigator />
                </NavigationContainer>
            </PaperProvider>
        </QueryClientProvider>
    );
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
