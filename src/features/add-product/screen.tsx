import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { CustomButton } from '../../components/Button';
import { CustomCard } from '../../components/Card';
import { CustomInput } from '../../components/Input';
import { RootStackParamList } from '../../types';
import { useCustomAddProduct } from './hooks';

type AddProductRouteProp = RouteProp<RootStackParamList, 'AddProduct'>;

export default function AddProductScreen() {
    const route = useRoute<AddProductRouteProp>();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { barcode, initialName } = route.params;

    const [name, setName] = useState(initialName || '');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('1');

    const { createProduct, isCreating } = useCustomAddProduct();

    const handleSubmit = async () => {
        if (!name || !price || !quantity) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        try {
            await createProduct({
                barcode,
                name,
                price: parseFloat(price),
                quantity: parseInt(quantity),
            });
            Alert.alert('Success', 'Product added successfully');
            // Navigate to details of the newly created product
            navigation.navigate('ProductDetails', { barcode });
        } catch (e) {
            Alert.alert('Error', 'Failed to create product. Price must be a number and Quantity an integer.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <CustomCard style={styles.card}>
                <Text variant="headlineSmall" style={styles.title}>New Product</Text>
                <Text variant="bodyMedium" style={styles.subtitle}>Enter the product details below</Text>

                <CustomInput
                    label="Barcode"
                    value={barcode}
                    editable={false}
                    left={<CustomInput.Icon icon="barcode" />}
                />

                <CustomInput
                    label="Product Name"
                    value={name}
                    onChangeText={setName}
                    placeholder="e.g. Organic Milk 1L"
                />

                <CustomInput
                    label="Price ($)"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric"
                    placeholder="0.00"
                />

                <CustomInput
                    label="Initial Quantity"
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="numeric"
                    placeholder="1"
                />

                <CustomButton
                    onPress={handleSubmit}
                    loading={isCreating}
                    disabled={isCreating}
                    style={styles.submitButton}
                >
                    Add Product
                </CustomButton>
            </CustomCard>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    card: {
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#666',
        marginBottom: 24,
    },
    submitButton: {
        marginTop: 24,
    },
});
