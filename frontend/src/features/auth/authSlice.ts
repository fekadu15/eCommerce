import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { 
  registerUser, 
  loginUser, 
  updateProfile, 
  addUserAddress, 
  removeUserAddress,
  updateExistingAddress 
} from "../../api/authApi";
import type { 
  LoginBody, 
  RegisterBody, 
  ApiError, 
  UserInfo, 
  UpdateProfileBody,
  Address
} from "../../types/auth";

interface AuthState {
  user: UserInfo | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const getPersistedUser = (): UserInfo | null => {
  const user = localStorage.getItem("user");
  if (!user || user === "undefined") return null;
  try {
    return JSON.parse(user) as UserInfo;
  } catch (e) {
    return null;
  }
};

const initialState: AuthState = {
  user: getPersistedUser(),
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

export const register = createAsyncThunk<{ user: UserInfo; token: string }, RegisterBody, { rejectValue: ApiError }>(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerUser(userData);
      const user: UserInfo = { _id: data._id, name: data.name, email: data.email, role: data.role, addresses: [] };
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(user));
      return { user, token: data.token };
    } catch (err) {
      return rejectWithValue(err as ApiError);
    }
  }
);

export const login = createAsyncThunk<{ user: UserInfo; token: string }, LoginBody, { rejectValue: ApiError }>(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await loginUser(userData);
      const user: UserInfo = { 
        _id: data._id, 
        name: data.name, 
        email: data.email, 
        role: data.role, 
        addresses: data.addresses || [] 
      };
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(user));
      return { user, token: data.token };
    } catch (err) {
      return rejectWithValue(err as ApiError);
    }
  }
);

export const updateUserProfile = createAsyncThunk<UserInfo, UpdateProfileBody, { rejectValue: ApiError }>(
  "auth/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const updatedUser = await updateProfile(profileData);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    } catch (err) {
      return rejectWithValue(err as ApiError);
    }
  }
);

export const addAddress = createAsyncThunk<UserInfo, Omit<Address, "_id">, { rejectValue: ApiError }>(
  "auth/addAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const updatedUser = await addUserAddress(addressData);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    } catch (err) {
      return rejectWithValue(err as ApiError);
    }
  }
);

export const editAddress = createAsyncThunk<UserInfo, { id: string; addressData: Partial<Address> }, { rejectValue: ApiError }>(
  "auth/editAddress",
  async ({ id, addressData }, { rejectWithValue }) => {
    try {
      const updatedUser = await updateExistingAddress(id, addressData);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    } catch (err) {
      return rejectWithValue(err as ApiError);
    }
  }
);

export const deleteAddress = createAsyncThunk<UserInfo, string, { rejectValue: ApiError }>(
  "auth/deleteAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      const updatedUser = await removeUserAddress(addressId);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    } catch (err) {
      return rejectWithValue(err as ApiError);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.user = null;
      state.token = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
      })

      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })
   
      .addMatcher(
        (action) => [
          updateUserProfile.fulfilled.type, 
          addAddress.fulfilled.type, 
          deleteAddress.fulfilled.type,
          editAddress.fulfilled.type // Added here
        ].includes(action.type),
        (state, action: PayloadAction<UserInfo>) => { 
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addMatcher(
        (action) => [
          updateUserProfile.pending.type, 
          addAddress.pending.type, 
          deleteAddress.pending.type,
          editAddress.pending.type 
        ].includes(action.type),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => [
          updateUserProfile.rejected.type, 
          addAddress.rejected.type, 
          deleteAddress.rejected.type,
          editAddress.rejected.type 
        ].includes(action.type),
        (state, action: PayloadAction<ApiError | undefined>) => { 
          state.loading = false;
          state.error = action.payload?.message || "Action failed";
        }
      );
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;