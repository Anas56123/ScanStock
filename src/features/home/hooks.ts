import { useQuery } from '@tanstack/react-query';
import { getAllProductsFromCache } from '../../utils/db';

export const useCachedProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            // In a real app, this might fetch from API and update cache
            // For now, we return from cache
            return getAllProductsFromCache();
        },
        initialData: [],
    });
};
