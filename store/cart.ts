import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  variantId: string;
  productId: string;
  title: string;
  price: number;
  image: string | null;
  color: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  toggleCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false, // Always defaults to closed on a fresh page load
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.variantId === item.variantId);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.variantId === item.variantId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
              isOpen: true, 
            };
          }
          return { items: [...state.items, item], isOpen: true };
        }),
      removeItem: (variantId) =>
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
        })),
    }),
    { 
      name: 'conqrete-cart-storage',
      // THIS IS THE FIX: Strictly tell it to ONLY save the items array
      partialize: (state) => ({ items: state.items }),
    } 
  )
);