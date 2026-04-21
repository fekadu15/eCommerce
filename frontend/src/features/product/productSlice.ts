import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/productApi";
import type { Product, ProductState, ApiError } from "../../types/product";

const initialState: ProductState = {
  products: [],
  product: null,
  loading: false,
  error: null
};

export const fetchAllProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: ApiError }
>("products/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await api.getAllProducts();
  } catch (err) {
    return rejectWithValue(err as ApiError);
  }
});

export const fetchProductById = createAsyncThunk<
  Product,
  string,
  { rejectValue: ApiError }
>("products/fetchById", async (id, { rejectWithValue }) => {
  try {
    return await api.getProductById(id);
  } catch (err) {
    return rejectWithValue(err as ApiError);
  }
});

const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading= false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed";
      })

      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Not found";
      });
  }
});

export const { clearProduct } = slice.actions;
export default slice.reducer;