import axios from "./axios";

export const registerUser = async (userData: any) => {
  try {
    const response = await axios.post("/auth/register", userData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};
export const loginUser = async (userData: any) => {
  try {
    const response = await axios.post("/auth/login", userData);
    return response.data; 
  } catch (error: any) {
    throw error.response?.data || { message: "Invalid credentials" };
  }
};