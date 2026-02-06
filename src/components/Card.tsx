import React from 'react';
import { StyleSheet } from 'react-native';
import { CardProps, Card as PaperCard } from 'react-native-paper';

export const CustomCard: React.FC<CardProps> = ({ children, style, ...props }) => {
    return (
        <PaperCard style={[styles.card, style]} {...(props as any)}>
            {children}
        </PaperCard>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 8,
        borderRadius: 12,
        elevation: 2,
    },
});
