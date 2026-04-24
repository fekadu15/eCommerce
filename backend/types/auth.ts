export interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

export interface LoginBody {
  email: string;
  password: string;
}
export interface UpdateProfileBody {
  name?: string;
  email?: string;
  password?: string;
}