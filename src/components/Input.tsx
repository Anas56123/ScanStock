import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput as PaperInput, TextInputProps } from 'react-native-paper';

type CustomInputType = React.FC<TextInputProps> & {
    Icon: typeof PaperInput.Icon;
    Affix: typeof PaperInput.Affix;
};

export const CustomInput = (({ style, ...props }) => {
    return (
        <PaperInput
            mode="outlined"
            style={[styles.input, style]}
            {...props}
        />
    );
}) as CustomInputType;

// Expose static methods/components from PaperInput
CustomInput.Icon = PaperInput.Icon;
CustomInput.Affix = PaperInput.Affix;

const styles = StyleSheet.create({
    input: {
        marginVertical: 8,
    },
});
