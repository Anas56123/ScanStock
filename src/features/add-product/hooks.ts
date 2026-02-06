import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/client';
import { Product } from '../../types';
import { saveProductToCache } from '../../utils/db';

export const useCustomAddProduct = () => {
    const queryClient = useQueryClient();

    const addMutation = useMutation({
        mutationFn: async (productData: Omit<Product, 'id' | 'createdAt'>) => {
            const product = await api.createProduct(productData);
            saveProductToCache(product);
            return product;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });

    return {
        createProduct: addMutation.mutateAsync,
        isCreating: addMutation.isPending,
    };
};
