import { z } from 'zod';

export const ProductSchema = z.object({
    id: z.string().uuid(),
    barcode: z.string(),
    name: z.string().min(1),
    price: z.number().positive(),
    quantity: z.number().int().min(0),
    createdAt: z.string().datetime(),
});

export type Product = z.infer<typeof ProductSchema>;

export const SaleSchema = z.object({
    id: z.string().uuid(),
    productId: z.string().uuid(),
    quantitySold: z.number().int().positive(),
    soldAt: z.string().datetime(),
});

export type Sale = z.infer<typeof SaleSchema>;

export type RootStackParamList = {
    Home: undefined;
    Scan: undefined;
    ProductDetails: { barcode: string };
    AddProduct: { barcode: string; initialName?: string };
};
