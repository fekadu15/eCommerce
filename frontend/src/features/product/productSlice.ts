import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/productApi";
import type { Product, ProductState, ApiError, CreateReviewBody } from "../../types/product";

const initialState: ProductState = {
  products: [],
  sellerProducts: [], 
  product: null,
  loading: false,
  error: null
};

export const fetchAllProducts = createAsyncThunk<Product[], void, { rejectValue: ApiError }>(
  "products/fetchAll", 
  async (_, { rejectWithValue }) => {
    try {
      return await api.getAllProducts();
    } catch (err) {
      return rejectWithValue(err as ApiError);
    }
  }
);

export const fetchProductById = createAsyncThunk<Product, string, { rejectValue: ApiError }>(
  "products/fetchById", 
  async (id, { rejectWithValue }) => {
    try {
      return await api.getProductById(id);
    } catch (err) {
      return rejectWithValue(err as ApiError);
    }
  }
);

export const createReview = createAsyncThunk<
  Product,
  { productId: string; reviewData: CreateReviewBody },
  { rejectValue: ApiError }
>("products/createReview", async ({ productId, reviewData }, { rejectWithValue }) => {
  try {
    const response = await api.addReview(productId, reviewData);
    return response.product; 
  } catch (err) {
    return rejectWithValue(err as ApiError);
  }
});

export const fetchSellerProducts = createAsyncThunk<Product[], void, { rejectValue: ApiError }>(
  "products/fetchSeller", 
  async (_, { rejectWithValue }) => {
    try {
      return await api.getMyProducts();
    } catch (err) {
      return rejectWithValue(err as ApiError);
    }
  }
);

export const createNewProduct = createAsyncThunk<Product, Partial<Product>, { rejectValue: ApiError }>(
  "products/create", 
  async (data, { rejectWithValue }) => {
    try {
      return await api.createProduct(data);
    } catch (err) {
      return rejectWithValue(err as ApiError);
    }
  }
);

export const updateProduct = createAsyncThunk<Product, { id: string; data: Partial<Product> }, { rejectValue: ApiError }>(
  "products/update", 
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await api.updateProduct(id, data);
    } catch (err) {
      return rejectWithValue(err as ApiError);
    }
  }
);

export const deleteProduct = createAsyncThunk<string, string, { rejectValue: ApiError }>(
  "products/delete", 
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteProduct(id);
      return id; 
    } catch (err) {
      return rejectWithValue(err as ApiError);
    }
  }
);

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
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch products";
      })

      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })

      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload; 
      })

      .addCase(fetchSellerProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.sellerProducts = action.payload;
      })

      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.sellerProducts.unshift(action.payload);
        state.products.unshift(action.payload); 
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        const sIndex = state.sellerProducts.findIndex(p => p._id === action.payload._id);
        if (sIndex !== -1) state.sellerProducts[sIndex] = action.payload;
        const pIndex = state.products.findIndex(p => p._id === action.payload._id);
        if (pIndex !== -1) state.products[pIndex] = action.payload;
        if (state.product?._id === action.payload._id) state.product = action.payload;
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.sellerProducts = state.sellerProducts.filter(p => p._id !== action.payload);
        state.products = state.products.filter(p => p._id !== action.payload);
      });
  }
});

export const { clearProduct } = slice.actions;
export default slice.reducer;