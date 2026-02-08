import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SegmentedButtons, Text, useTheme } from 'react-native-paper';
import { supabase } from '../../api/supabase';
import { CustomButton } from '../../components/Button';
import { CustomInput } from '../../components/Input';
import { RootStackParamList, UserRole } from '../../types';

export default function SignupScreen() {
    const theme = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<UserRole>('customer');
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    role: role,
                },
            },
        });

        if (error) {
            Alert.alert('Signup Failed', error.message);
        } else {
            Alert.alert('Success', 'Check your email for confirmation!');
            navigation.navigate('Login');
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
                    <Text variant="displaySmall" style={[styles.title, { color: theme.colors.primary }]}>Join Us</Text>
                    <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>Create your ScanStock account</Text>
                </View>

                <View style={styles.form}>
                    <Text variant="titleMedium" style={styles.label}>I am a:</Text>
                    <SegmentedButtons
                        value={role}
                        onValueChange={value => setRole(value as UserRole)}
                        buttons={[
                            { value: 'customer', label: 'Customer', icon: 'account' },
                            { value: 'seller', label: 'Seller', icon: 'store' },
                        ]}
                        style={styles.rolePicker}
                    />

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
                        onPress={handleSignup}
                        loading={loading}
                        disabled={loading}
                        style={styles.signupBtn}
                    >
                        Create Account
                    </CustomButton>

                    <View style={styles.footer}>
                        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                            Already have an account?{' '}
                        </Text>
                        <CustomButton
                            onPress={() => navigation.navigate('Login')}
                            mode="text"
                            compact
                        >
                            Login
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
        marginBottom: 32,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    form: {
        width: '100%',
    },
    label: {
        marginBottom: 12,
        fontWeight: 'bold',
    },
    rolePicker: {
        marginBottom: 24,
    },
    signupBtn: {
        marginTop: 24,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
});
