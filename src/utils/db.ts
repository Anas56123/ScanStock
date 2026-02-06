import * as SQLite from 'expo-sqlite';
import { Product } from '../types';

const db = SQLite.openDatabaseSync('scanstock.db');

export const initDb = () => {
    db.execSync(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY NOT NULL,
      barcode TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      quantity INTEGER NOT NULL,
      createdAt TEXT NOT NULL
    );
  `);
};

export const saveProductToCache = (product: Product) => {
    db.runSync(
        'INSERT OR REPLACE INTO products (id, barcode, name, price, quantity, createdAt) VALUES (?, ?, ?, ?, ?, ?)',
        [product.id, product.barcode, product.name, product.price, product.quantity, product.createdAt]
    );
};

export const getProductFromCache = (barcode: string): Product | null => {
    const result = db.getFirstSync<Product>(
        'SELECT * FROM products WHERE barcode = ?',
        [barcode]
    );
    return result || null;
};

export const getAllProductsFromCache = (): Product[] => {
    return db.getAllSync<Product>('SELECT * FROM products');
};
