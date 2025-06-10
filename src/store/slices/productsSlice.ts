import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types';
import { getProducts } from '@/api/api';

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  total: number;
  currentPage: number;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  total: 0,
  currentPage: 1,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page = 1, pageSize = 20 }: { page?: number; pageSize?: number }) => {
    const response = await getProducts(page, pageSize);
    return response;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { setPage } = productsSlice.actions;
export default productsSlice.reducer; 