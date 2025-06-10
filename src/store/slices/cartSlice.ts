import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

interface CartItem extends Product {
    count: number;
}

interface CartState {
    items: CartItem[];
    customerPhone: string;
}

const initialState: CartState = {
    items: [],
    customerPhone: '+7'
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<{ product: Product; count: number }>) => {
            const { product, count } = action.payload;
            const existingItem = state.items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.count = count;
            } else {
                state.items.push({ ...product, count });
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateCustomerPhone: (state, action: PayloadAction<string>) => {
            state.customerPhone = action.payload;
        },
        resetCart: (state) => {
            state.items = [];
            state.customerPhone = '+7';
        }
    }
});

export const { addToCart, removeFromCart, updateCustomerPhone, resetCart } = cartSlice.actions;
export default cartSlice.reducer; 