import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { supabase } from '../api/supabase';
import AddProductScreen from '../features/add-product/screen';
import ForgotPasswordScreen from '../features/auth/forgot-password';
import LoginScreen from '../features/auth/login';
import SignupScreen from '../features/auth/signup';
import HomeScreen from '../features/home/screen';
import ProductDetailsScreen from '../features/product/screen';
import ScanScreen from '../features/scan/screen';
import { useStore } from '../store';
import { RootStackParamList } from '../types';
import { darkTheme, lightTheme } from '../utils/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainNavigator = () => {
    const { isDarkMode, toggleDarkMode, user } = useStore();

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.surface,
                },
                headerTintColor: theme.colors.onSurface,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerRight: () => (
                    <View style={{ flexDirection: 'row' }}>
                        <IconButton
                            icon={isDarkMode ? 'weather-sunny' : 'weather-night'}
                            iconColor={theme.colors.onSurface}
                            onPress={toggleDarkMode}
                        />
                        {user && (
                            <IconButton
                                icon="logout"
                                iconColor={theme.colors.onSurface}
                                onPress={handleLogout}
                            />
                        )}
                    </View>
                ),
            }}
        >
            {!user ? (
                // Auth Stack
                <>
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Signup"
                        component={SignupScreen}
                        options={{ title: 'Create Account' }}
                    />
                    <Stack.Screen
                        name="ForgotPassword"
                        component={ForgotPasswordScreen}
                        options={{ title: 'Reset Password' }}
                    />
                </>
            ) : (
                // App Stack
                <>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ title: 'ScanStock' }}
                    />
                    <Stack.Screen
                        name="Scan"
                        component={ScanScreen}
                        options={{ title: 'Scan Barcode' }}
                    />
                    <Stack.Screen
                        name="ProductDetails"
                        component={ProductDetailsScreen}
                        options={{ title: 'Product Details' }}
                    />
                    <Stack.Screen
                        name="AddProduct"
                        component={AddProductScreen}
                        options={{ title: 'New Product' }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
};
