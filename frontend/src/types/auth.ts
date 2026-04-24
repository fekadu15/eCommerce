
export interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "seller" | "admin";
  token: string;
  addresses?: Address[];
}

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  addresses?: Address[];
  role: "customer" | "seller" | "admin";
}
export interface UpdateProfileBody {
  name?: string;
  email?: string;
  password?: string;
}
export interface Address {
  _id: string;
  label: string; 
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface ApiError {
  message: string;
}