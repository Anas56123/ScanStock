import { create } from 'zustand';

interface AppState {
    scannedBarcode: string | null;
    setScannedBarcode: (barcode: string | null) => void;
    isOffline: boolean;
    setIsOffline: (status: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
    scannedBarcode: null,
    setScannedBarcode: (barcode) => set({ scannedBarcode: barcode }),
    isOffline: false,
    setIsOffline: (status) => set({ isOffline: status }),
}));
