import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddProductScreen from '../features/add-product/screen';
import HomeScreen from '../features/home/screen';
import ProductDetailsScreen from '../features/product/screen';
import ScanScreen from '../features/scan/screen';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#2196F3',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'ScanStock' }}
            />
            <Stack.Screen
                name="Scan"
                component={ScanScreen}
                options={{ title: 'Scan Barcode' }}
            />
            <Stack.Screen
                name="ProductDetails"
                component={ProductDetailsScreen}
                options={{ title: 'Product Details' }}
            />
            <Stack.Screen
                name="AddProduct"
                component={AddProductScreen}
                options={{ title: 'New Product' }}
            />
        </Stack.Navigator>
    );
};
