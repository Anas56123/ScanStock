import { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { UserRole } from '../types';

interface AppState {
    user: User | null;
    session: Session | null;
    role: UserRole | null;
    setUser: (user: User | null) => void;
    setSession: (session: Session | null) => void;
    setRole: (role: UserRole | null) => void;
    scannedBarcode: string | null;
    setScannedBarcode: (barcode: string | null) => void;
    isOffline: boolean;
    setIsOffline: (status: boolean) => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

export const useStore = create<AppState>((set) => ({
    user: null,
    session: null,
    role: null,
    setUser: (user) => set({ user }),
    setSession: (session) => set({ session }),
    setRole: (role) => set({ role }),
    scannedBarcode: null,
    setScannedBarcode: (barcode) => set({ scannedBarcode: barcode }),
    isOffline: false,
    setIsOffline: (status) => set({ isOffline: status }),
    isDarkMode: false,
    toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));
