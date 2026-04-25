import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/orderApi";
import type { 
  Order,
  OrderState,
  CheckoutBody,
  PaymentBody ,
  SellerOrderStats,
  OrderStatus
} from "../../types/order";
import type { ApiError } from "../../types/product";

const initialState: OrderState = {
  orders: [],         
  sellerOrders: [],   
  stats: null,    
  currentOrder: null,
  clientSecret: null,
  loading: false,
  error: null,
};

export const processCheckout = createAsyncThunk<
  Order,
  CheckoutBody,
  { rejectValue: ApiError }
>("orders/checkout", async (data, { rejectWithValue }) => {
  try {
    return await api.checkout(data);
  } catch (err) {
    return rejectWithValue(err as ApiError);
  }
});

export const fetchPaymentSecret = createAsyncThunk<
  { clientSecret: string },
  PaymentBody,
  { rejectValue: ApiError }
>("orders/fetchSecret", async (data, { rejectWithValue }) => {
  try {
    return await api.createPaymentIntent(data);
  } catch (err) {
    return rejectWithValue(err as ApiError);
  }
});

export const confirmPaymentStatus = createAsyncThunk<
  { message: string; order: Order },
  PaymentBody,
  { rejectValue: ApiError }
>("orders/confirmPayment", async (data, { rejectWithValue }) => {
  try {
    return await api.confirmPaymentOnServer(data);
  } catch (err) {
    return rejectWithValue(err as ApiError);
  }
});

export const fetchMyOrders = createAsyncThunk<
  Order[],
  void,
  { rejectValue: ApiError }
>("orders/fetchMyOrders", async (_, { rejectWithValue }) => {
  try {
    return await api.getMyOrders();
  } catch (err) {
    return rejectWithValue(err as ApiError);
  }
});

export const cancelOrderAction = createAsyncThunk<
  { message: string; order: Order },
  string,
  { rejectValue: ApiError }
>("orders/cancel", async (orderId, { rejectWithValue }) => {
  try {
   
    return await api.cancelOrder(orderId);
  } catch (err) {
    return rejectWithValue(err as ApiError);
  }
});

export const fetchAllOrders = createAsyncThunk<
  Order[],
  void,
  { rejectValue: ApiError }
>("orders", async (_, { rejectWithValue }) => {
  try {
 
    return await api.getAllOrders(); 
  } catch (err) {
    return rejectWithValue(err as ApiError);
  }
});

export const fetchSellerOrders = createAsyncThunk<Order[], void, { rejectValue: ApiError }>(
  "orders/fetchSellerOrders",
  async (_, { rejectWithValue }) => {
    try {
      return await api.getSellerOrders();
    } catch (err) {
      return rejectWithValue(err as ApiError);
    }
  }
);

export const fetchSellerStats = createAsyncThunk<SellerOrderStats, void, { rejectValue: ApiError }>(
  "orders/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      return await api.getSellerStats();
    } catch (err) {
      return rejectWithValue(err as ApiError);
    }
  }
);

export const updateStatusAction = createAsyncThunk<Order, { id: string; status: OrderStatus }, { rejectValue: ApiError }>(
  "orders/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      return await api.updateOrderStatus(id, status);
    } catch (err) {
      return rejectWithValue(err as ApiError);
    }
  }
);

const slice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
    resetCheckout: (state) => {
      state.currentOrder = null;
      state.clientSecret = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(processCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(processCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Checkout failed";
      })

      
      .addCase(fetchPaymentSecret.fulfilled, (state, action) => {
        state.clientSecret = action.payload.clientSecret;
      })

      
      .addCase(confirmPaymentStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmPaymentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.order;
        state.clientSecret = null; 
      })
      .addCase(confirmPaymentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Payment confirmation failed";
      })

      
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch orders";
      })

      
      .addCase(cancelOrderAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelOrderAction.fulfilled, (state, action) => {
        state.loading = false;
   
        state.orders = state.orders.map((o) => 
          o._id === action.payload.order._id ? action.payload.order : o
        );
      })
      .addCase(cancelOrderAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Cancellation failed";
      })
      .addCase(fetchSellerOrders.fulfilled, (state, action) => {
       state.loading = false;
       state.sellerOrders = action.payload; 
      })
       .addCase(fetchSellerStats.fulfilled, (state, action) => {
       state.stats = action.payload;
      })
      .addCase(updateStatusAction.fulfilled, (state, action) => {
       state.sellerOrders = state.sellerOrders.map((o) => 
       o._id === action.payload._id ? action.payload : o
     );
     })
  }
});

export const { clearOrderError, resetCheckout } = slice.actions;
export default slice.reducer;