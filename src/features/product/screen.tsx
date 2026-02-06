import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Divider, Text } from 'react-native-paper';
import { CustomButton } from '../../components/Button';
import { CustomCard } from '../../components/Card';
import { CustomInput } from '../../components/Input';
import { RootStackParamList } from '../../types';
import { useProductDetails, useSaleMutation } from './hooks';

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

export default function ProductDetailsScreen() {
    const route = useRoute<ProductDetailsRouteProp>();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { barcode } = route.params;

    const [quantityToSell, setQuantityToSell] = useState('1');
    const { data: product, isLoading, error } = useProductDetails(barcode);
    const { saleMutation, isSelling } = useSaleMutation();

    const handleConfirmSale = async () => {
        if (!product) return;

        const qty = parseInt(quantityToSell);
        if (isNaN(qty) || qty <= 0) {
            Alert.alert('Error', 'Please enter a valid quantity');
            return;
        }

        if (qty > product.quantity) {
            Alert.alert('Error', 'Insufficient stock');
            return;
        }

        try {
            await saleMutation.mutateAsync({
                productId: product.id,
                quantitySold: qty,
            });
            Alert.alert('Success', 'Sale recorded successfully');
            navigation.goBack();
        } catch (e) {
            Alert.alert('Error', 'Failed to record sale. Try again later.');
        }
    };

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error || !product) {
        return (
            <View style={styles.center}>
                <Text variant="headlineSmall">Product not found</Text>
                <CustomButton onPress={() => navigation.goBack()}>Go Back</CustomButton>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <CustomCard style={styles.headerCard}>
                <Text variant="headlineSmall" style={styles.title}>{product.name}</Text>
                <Text variant="bodyLarge" style={styles.barcode}>{product.barcode}</Text>
                <Divider style={styles.divider} />
                <View style={styles.infoRow}>
                    <View>
                        <Text variant="labelMedium">In Stock</Text>
                        <Text variant="displaySmall" style={styles.stockValue}>{product.quantity}</Text>
                    </View>
                    <View style={styles.alignEnd}>
                        <Text variant="labelMedium">Price</Text>
                        <Text variant="displaySmall" style={styles.priceValue}>${product.price.toFixed(2)}</Text>
                    </View>
                </View>
            </CustomCard>

            <CustomCard style={styles.saleCard}>
                <Text variant="titleLarge" style={styles.saleTitle}>Process Sale</Text>
                <CustomInput
                    label="Quantity to Sell"
                    value={quantityToSell}
                    onChangeText={setQuantityToSell}
                    keyboardType="numeric"
                    placeholder="Enter quantity"
                />
                <CustomButton
                    onPress={handleConfirmSale}
                    loading={isSelling}
                    disabled={isSelling}
                >
                    Confirm Sale
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
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    headerCard: {
        padding: 20,
        marginBottom: 16,
    },
    title: {
        fontWeight: 'bold',
        color: '#1C1B1F',
    },
    barcode: {
        color: '#666',
        marginTop: 4,
    },
    divider: {
        marginVertical: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    stockValue: {
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    priceValue: {
        fontWeight: 'bold',
        color: '#2196F3',
    },
    alignEnd: {
        alignItems: 'flex-end',
    },
    saleCard: {
        padding: 20,
    },
    saleTitle: {
        marginBottom: 16,
    },
});
