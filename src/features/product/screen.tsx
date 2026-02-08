import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Divider, Text, useTheme } from 'react-native-paper';
import { CustomButton } from '../../components/Button';
import { CustomCard } from '../../components/Card';
import { CustomInput } from '../../components/Input';
import { RootStackParamList } from '../../types';
import { useProductDetails, useSaleMutation } from './hooks';

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

export default function ProductDetailsScreen() {
    const theme = useTheme();
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
            <View style={[styles.center, { backgroundColor: theme.colors.background }]}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error || !product) {
        return (
            <View style={[styles.center, { backgroundColor: theme.colors.background }]}>
                <Text variant="headlineSmall" style={{ color: theme.colors.onSurface }}>Product not found</Text>
                <CustomButton onPress={() => navigation.goBack()} style={{ marginTop: 16 }}>Go Back</CustomButton>
            </View>
        );
    }

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <CustomCard style={styles.headerCard}>
                <Text variant="headlineSmall" style={[styles.title, { color: theme.colors.onSurface }]}>{product.name}</Text>
                <Text variant="bodyLarge" style={[styles.barcode, { color: theme.colors.onSurfaceVariant }]}>{product.barcode}</Text>
                <Divider style={styles.divider} />
                <View style={styles.infoRow}>
                    <View>
                        <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>In Stock</Text>
                        <Text variant="displaySmall" style={[styles.stockValue, { color: '#4CAF50' }]}>{product.quantity}</Text>
                    </View>
                    <View style={styles.alignEnd}>
                        <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>Price</Text>
                        <Text variant="displaySmall" style={[styles.priceValue, { color: theme.colors.primary }]}>${product.price.toFixed(2)}</Text>
                    </View>
                </View>
            </CustomCard>

            <CustomCard style={styles.saleCard}>
                <Text variant="titleLarge" style={[styles.saleTitle, { color: theme.colors.onSurface }]}>Process Sale</Text>
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
    },
    barcode: {
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
    },
    priceValue: {
        fontWeight: 'bold',
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
