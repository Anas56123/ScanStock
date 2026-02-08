import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { FAB, Text, useTheme } from 'react-native-paper';
import { CustomCard } from '../../components/Card';
import { RootStackParamList } from '../../types';
import { useCachedProducts } from './hooks';

export default function HomeScreen() {
    const theme = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { data: cachedProducts = [] } = useCachedProducts();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {cachedProducts.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text variant="headlineSmall" style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}>
                        No products scanned yet
                    </Text>
                    <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                        Tap the camera icon to start scanning
                    </Text>
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
                                    <Text variant="titleMedium" style={[styles.productName, { color: theme.colors.onSurface }]}>
                                        {item.name}
                                    </Text>
                                    <Text variant="bodySmall" style={[styles.barcodeText, { color: theme.colors.onSurfaceVariant }]}>
                                        {item.barcode}
                                    </Text>
                                </View>
                                <View style={styles.inventoryInfo}>
                                    <Text variant="titleLarge" style={[styles.price, { color: theme.colors.primary }]}>
                                        ${item.price.toFixed(2)}
                                    </Text>
                                    <Text variant="labelLarge" style={[styles.stock, { color: '#4CAF50' }]}>
                                        Stock: {item.quantity}
                                    </Text>
                                </View>
                            </View>
                        </CustomCard>
                    )}
                />
            )}
            <FAB
                icon="camera"
                style={[styles.fab, { backgroundColor: theme.colors.primary }]}
                onPress={() => navigation.navigate('Scan')}
                label="Scan Product"
                color={theme.colors.onPrimary}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    inventoryInfo: {
        alignItems: 'flex-end',
    },
    price: {
        fontWeight: 'bold',
    },
    stock: {
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    emptyText: {
        marginBottom: 8,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
