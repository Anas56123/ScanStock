import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { supabase } from '../../api/supabase';
import { CustomButton } from '../../components/Button';
import { CustomInput } from '../../components/Input';
import { RootStackParamList } from '../../types';

export default function LoginScreen() {
    const theme = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            Alert.alert('Login Failed', error.message);
        }
        setLoading(false);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: theme.colors.background }]}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text variant="displaySmall" style={[styles.title, { color: theme.colors.primary }]}>ScanStock</Text>
                    <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>Welcome back!</Text>
                </View>

                <View style={styles.form}>
                    <CustomInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        left={<CustomInput.Icon icon="email" />}
                    />
                    <CustomInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        left={<CustomInput.Icon icon="lock" />}
                    />

                    <CustomButton
                        onPress={() => navigation.navigate('ForgotPassword')}
                        mode="text"
                        style={styles.forgotBtn}
                    >
                        Forgot Password?
                    </CustomButton>

                    <CustomButton
                        onPress={handleLogin}
                        loading={loading}
                        disabled={loading}
                        style={styles.loginBtn}
                    >
                        Login
                    </CustomButton>

                    <View style={styles.footer}>
                        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                            Don't have an account?{' '}
                        </Text>
                        <CustomButton
                            onPress={() => navigation.navigate('Signup')}
                            mode="text"
                            compact
                        >
                            Sign Up
                        </CustomButton>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 48,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    form: {
        width: '100%',
    },
    forgotBtn: {
        alignSelf: 'flex-end',
    },
    loginBtn: {
        marginTop: 24,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
});
