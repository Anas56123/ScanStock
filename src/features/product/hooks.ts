import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/client';
import { Product } from '../../types';
import { getProductFromCache, saveProductToCache } from '../../utils/db';

export const useProductDetails = (barcode: string) => {
    return useQuery({
        queryKey: ['product', barcode],
        queryFn: async () => {
            try {
                const product = await api.getProductByBarcode(barcode);
                if (product) {
                    saveProductToCache(product);
                }
                return product;
            } catch (error) {
                const cached = getProductFromCache(barcode);
                if (cached) return cached;
                throw error;
            }
        },
    });
};

export const useSaleMutation = () => {
    const queryClient = useQueryClient();

    const saleMutation = useMutation({
        mutationFn: async ({ productId, quantitySold }: { productId: string, quantitySold: number }) => {
            // 1. Create sale record
            const sale = await api.createSale({ productId, quantitySold });

            // 2. Update product quantity (In a real app, the backend might do this automatically, 
            // but the prompt asked for explicit PATCH /products/{id}/quantity)
            // First get current product to calculate new quantity
            // or just trust the backend returns the updated product.

            // Since it's a specific requirement:
            const products = queryClient.getQueryData<Product[]>(['products']) || [];
            const product = products.find(p => p.id === productId);
            const newQuantity = (product?.quantity || 0) - quantitySold;

            await api.updateProductQuantity(productId, newQuantity);

            return sale;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['product'] });
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });

    return { saleMutation, isSelling: saleMutation.isPending };
};
