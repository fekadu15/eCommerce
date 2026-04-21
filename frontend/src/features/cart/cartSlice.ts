import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/cartApi";
import type { ICart, CartState, AddToCartBody, RemoveFromCartBody } from "../../types/cart";
import type { ApiError } from "../../types/product";

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null
};

export const fetchCart = createAsyncThunk<
  ICart | null,
  void,
  { rejectValue: ApiError }
>("cart/fetch", async (_, { rejectWithValue }) => {
  try {
    return await api.getCart();
  } catch (err) {
    return rejectWithValue(err as ApiError);
  }
});

export const addItemToCart = createAsyncThunk<
  ICart,
  AddToCartBody,
  { rejectValue: ApiError }
>("cart/addItem", async (data, { rejectWithValue }) => {
  try {
    return await api.addToCart(data);
  } catch (err) {
    return rejectWithValue(err as ApiError);
  }
});

export const removeItemFromCart = createAsyncThunk<
  ICart,
  RemoveFromCartBody,
  { rejectValue: ApiError }
>("cart/removeItem", async (data, { rejectWithValue }) => {
  try {
    return await api.removeFromCart(data);
  } catch (err) {
    return rejectWithValue(err as ApiError);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch cart";
      })
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add item";
      })
      .addCase(removeItemFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to remove item";
      });
  }
});

export const { clearCartError } = cartSlice.actions;
export default cartSlice.reducer;