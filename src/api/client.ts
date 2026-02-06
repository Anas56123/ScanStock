import axios from 'axios';
import { OPEN_FOOD_FACTS_API, SUPABASE_ANON_KEY, SUPABASE_URL } from '../constants/config';
import { Product, Sale } from '../types';

// Supabase Axios Client
const supabaseClient = axios.create({
    baseURL: `${SUPABASE_URL}/rest/v1`,
    headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
    },
});

export const api = {
    // Product Operations
    getProductByBarcode: async (barcode: string): Promise<Product | null> => {
        try {
            const response = await supabaseClient.get<Product[]>(`/products`, {
                params: { barcode: `eq.${barcode}`, select: '*' },
            });
            return response.data.length > 0 ? response.data[0] : null;
        } catch (error) {
            console.error('Fetch product error:', error);
            return null;
        }
    },

    createProduct: async (product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
        const response = await supabaseClient.post<Product[]>('/products', product);
        return response.data[0];
    },

    updateProductQuantity: async (id: string, quantity: number): Promise<Product> => {
        const response = await supabaseClient.patch<Product[]>(`/products`,
            { quantity },
            { params: { id: `eq.${id}` } }
        );
        return response.data[0];
    },

    // Sales Operations
    createSale: async (sale: Omit<Sale, 'id' | 'soldAt'>): Promise<Sale> => {
        const response = await supabaseClient.post<Sale[]>('/sales', sale);
        return response.data[0];
    },

    // OpenFoodFacts Fallback
    fetchFromOpenFoodFacts: async (barcode: string): Promise<{ name: string; image?: string } | null> => {
        try {
            const response = await axios.get(`${OPEN_FOOD_FACTS_API}/${barcode}.json`);
            const data = response.data;
            if (data.status === 1 && data.product) {
                return {
                    name: data.product.product_name,
                    image: data.product.image_front_url,
                };
            }
            return null;
        } catch (error) {
            console.warn('OpenFoodFacts lookup failed', error);
            return null;
        }
    },
};

export default supabaseClient;
