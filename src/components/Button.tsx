import React from 'react';
import { StyleSheet } from 'react-native';
import { ButtonProps, Button as PaperButton } from 'react-native-paper';

export const CustomButton: React.FC<ButtonProps> = ({ children, mode = 'contained', style, ...props }) => {
    return (
        <PaperButton
            mode={mode}
            style={[styles.button, style]}
            contentStyle={styles.content}
            labelStyle={styles.label}
            {...props}
        >
            {children}
        </PaperButton>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        marginVertical: 8,
    },
    content: {
        height: 56, // Large button for one-hand friendly UI
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
