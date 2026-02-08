import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { supabase } from '../../api/supabase';
import { CustomButton } from '../../components/Button';
import { CustomInput } from '../../components/Input';
import { RootStackParamList } from '../../types';

export default function ForgotPasswordScreen() {
    const theme = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email address');
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.resetPasswordForEmail(email);

        if (error) {
            Alert.alert('Error', error.message);
        } else {
            Alert.alert('Success', 'Check your email for the reset link');
            navigation.goBack();
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
                    <Text variant="headlineLarge" style={[styles.title, { color: theme.colors.primary }]}>Reset Password</Text>
                    <Text variant="bodyLarge" style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
                        Enter your email and we'll send you a link to reset your password.
                    </Text>
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

                    <CustomButton
                        onPress={handleReset}
                        loading={loading}
                        disabled={loading}
                        style={styles.resetBtn}
                    >
                        Send Reset Link
                    </CustomButton>

                    <CustomButton
                        onPress={() => navigation.goBack()}
                        mode="text"
                        style={styles.backBtn}
                    >
                        Back to Login
                    </CustomButton>
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
        marginBottom: 32,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 12,
    },
    subtitle: {
        lineHeight: 24,
    },
    form: {
        width: '100%',
    },
    resetBtn: {
        marginTop: 24,
    },
    backBtn: {
        marginTop: 8,
    },
});
