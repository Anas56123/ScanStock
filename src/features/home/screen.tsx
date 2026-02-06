import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import { CustomCard } from '../../components/Card';
import { RootStackParamList } from '../../types';
import { useCachedProducts } from './hooks';

export default function HomeScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { data: cachedProducts = [] } = useCachedProducts();

    return (
        <View style={styles.container}>
            {cachedProducts.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text variant="headlineSmall" style={styles.emptyText}>No products scanned yet</Text>
                    <Text variant="bodyMedium">Tap the camera icon to start scanning</Text>
                </View>
            ) : (
                <FlatList
                    data={cachedProducts}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => (
                        <CustomCard onPress={() => navigation.navigate('ProductDetails', { barcode: item.barcode })}>
                            <View style={styles.cardContent}>
                                <View>
                                    <Text variant="titleMedium" style={styles.productName}>{item.name}</Text>
                                    <Text variant="bodySmall" style={styles.barcodeText}>{item.barcode}</Text>
                                </View>
                                <View style={styles.inventoryInfo}>
                                    <Text variant="titleLarge" style={styles.price}>${item.price.toFixed(2)}</Text>
                                    <Text variant="labelLarge" style={styles.stock}>Stock: {item.quantity}</Text>
                                </View>
                            </View>
                        </CustomCard>
                    )}
                />
            )}
            <FAB
                icon="camera"
                style={styles.fab}
                onPress={() => navigation.navigate('Scan')}
                label="Scan Product"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    list: {
        padding: 16,
        paddingBottom: 88,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    productName: {
        fontWeight: 'bold',
    },
    barcodeText: {
        color: '#666',
    },
    inventoryInfo: {
        alignItems: 'flex-end',
    },
    price: {
        color: '#2196F3',
        fontWeight: 'bold',
    },
    stock: {
        color: '#4CAF50',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    emptyText: {
        marginBottom: 8,
        color: '#666',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#2196F3',
    },
});
