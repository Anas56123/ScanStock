import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { CustomButton } from '../../components/Button';
import { RootStackParamList } from '../../types';
import { useProductSearch } from './hooks';

export default function ScanScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const { searchProduct, isLoading } = useProductSearch();

    if (!permission) {
        // Camera permissions are still loading
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text style={styles.text}>Requesting camera permission...</Text>
            </View>
        );
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.center}>
                <Text style={styles.text}>We need your permission to show the camera</Text>
                <CustomButton onPress={requestPermission}>
                    Grant Permission
                </CustomButton>
            </View>
        );
    }

    const handleBarCodeScanned = async (data: string) => {
        if (scanned) return;
        setScanned(true);

        try {
            const result = await searchProduct(data);
            if (result && 'id' in result) {
                navigation.navigate('ProductDetails', { barcode: data });
            } else {
                const initialName = result && 'name' in result ? (result as any).name : undefined;
                navigation.navigate('AddProduct', { barcode: data, initialName });
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to verify product. Redirecting to manual addition.');
            navigation.navigate('AddProduct', { barcode: data });
        } finally {
            // Allow re-scanning after a delay if navigation didn't happen
            setTimeout(() => setScanned(false), 2000);
        }
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFillObject}
                barcodeScannerSettings={{
                    barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e", "code128"],
                }}
                onBarcodeScanned={scanned || isLoading ? undefined : ({ data }) => handleBarCodeScanned(data)}
            />
            <View style={styles.overlay}>
                <View style={styles.unfocusedContainer}></View>
                <View style={styles.middleContainer}>
                    <View style={styles.unfocusedContainer}></View>
                    <View style={styles.focusedContainer}></View>
                    <View style={styles.unfocusedContainer}></View>
                </View>
                <View style={styles.unfocusedContainer}>
                    <Text style={styles.scanText}>Position barcode within the frame</Text>
                </View>
            </View>
            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator animating={true} size="large" color="#fff" />
                    <Text style={styles.loadingText}>Verifying product...</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        marginTop: 16,
        textAlign: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    unfocusedContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleContainer: {
        flexDirection: 'row',
        height: 250,
    },
    focusedContainer: {
        width: 250,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 16,
    },
    scanText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: '#fff',
        marginTop: 10,
        fontSize: 18,
    },
});
