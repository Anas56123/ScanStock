import { useState } from 'react';
import { api } from '../../api/client';
import { Product } from '../../types';
import { getProductFromCache, saveProductToCache } from '../../utils/db';

export const useProductSearch = () => {
    const [isLoading, setIsLoading] = useState(false);

    // Return Type:
    // - Product: Found in DB/Cache (Application Product)
    // - { name: string, image?: string }: Found in OpenFoodFacts (Draft)
    // - null: Not found anywhere
    const searchProduct = async (barcode: string): Promise<Product | { name: string, image?: string } | null> => {
        setIsLoading(true);
        try {
            // 1. Try local cache first
            const cached = getProductFromCache(barcode);
            if (cached) {
                return cached;
            }

            // 2. Try Supabase API
            const product = await api.getProductByBarcode(barcode);

            if (product) {
                // 3. Save to cache if found in Backend
                saveProductToCache(product);
                return product;
            }

            // 4. Try OpenFoodFacts Fallback
            const offData = await api.fetchFromOpenFoodFacts(barcode);
            if (offData) {
                return offData;
            }

            return null;
        } catch (error) {
            console.error('Search product error:', error);
            // Fallback: If network error, still try to return what we might have or null
            // (Actually we checked cache first, so if we are here, we failed everything)
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return { searchProduct, isLoading };
};
