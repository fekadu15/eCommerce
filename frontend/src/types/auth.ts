
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
}

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "seller" | "admin";
}


export interface ApiError {
  message: string;
}