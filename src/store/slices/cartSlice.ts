import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

interface CartItem {
    product: Product;
    count: number;
}

interface CartState {
    items: CartItem[];
    customerPhone: string;
}

const initialState: CartState = {
    items: [],
    customerPhone: '+7 (___) ___-__-__'
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<{ product: Product; count: number }>) => {
            const { product, count } = action.payload;
            const existingItem = state.items.find(item => item.product.id === product.id);
            if (existingItem) {
                existingItem.count = count;
            } else {
                state.items.push({ product, count });
            }
            if (typeof window !== 'undefined') {
                localStorage.setItem('cartState', JSON.stringify(state));
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.product.id !== action.payload);
            if (typeof window !== 'undefined') {
                localStorage.setItem('cartState', JSON.stringify(state));
            }
        },
        updateCustomerPhone: (state, action: PayloadAction<string>) => {
            state.customerPhone = action.payload;
            if (typeof window !== 'undefined') {
                localStorage.setItem('cartState', JSON.stringify(state));
            }
        },
        resetCart: (state) => {
            state.items = [];
            state.customerPhone = '+7 (___) ___-__-__';
            if (typeof window !== 'undefined') {
                localStorage.setItem('cartState', JSON.stringify(state));
            }
        },
        loadState: (state, action: PayloadAction<CartState>) => {
            return action.payload;
        }
    }
});

export const { addToCart, removeFromCart, updateCustomerPhone, resetCart, loadState } = cartSlice.actions;
export default cartSlice.reducer; 