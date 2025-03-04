import { create } from "zustand";
import axios, { AxiosError } from "axios";

const API_URL = "http://localhost:4500/api/auth";
axios.defaults.withCredentials = true;

interface User {
  id: string;
  email: string;
  name: string;
  isVerified: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  message: string | null;
  checkAuth: () => Promise<void>;
  verifyEmail?: (verificationCode: string) => Promise<{ message: string }>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post<{ user: User }>(`${API_URL}/signup`, {
        email,
        password,
        name,
      });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      set({ error: axiosError.response?.data?.message || "Error signing up", isLoading: false });
      throw error;
    }
  },

  verifyEmail: async (verificationCode: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post<{ message: string }>(`${API_URL}/verify-email`, {
        code: verificationCode,
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      set({ error: axiosError.response?.data?.message || "Error verifying email", isLoading: false });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
    } catch (error) {
        console.log(error);
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post<{ user: User }>(`${API_URL}/login`, {
        email,
        password,
      });
      set({ error: null, user: response.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      set({ error: axiosError.response?.data?.message || "Error logging in", isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({ user: null, isAuthenticated: false, error: null, isLoading: false });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      set({ error: axiosError.response?.data?.message || "Error logging out", isLoading: false });
      throw error;
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post<{ message: string }>(`${API_URL}/forgot-password`, { email });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      set({ error: axiosError.response?.data?.message || "Error sending reset password email", isLoading: false });
      throw error;
    }
  },
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
  
    try {
      console.log("API URL:", `${API_URL}/reset-password/${token}`);

      const response = await axios.post<{ message: string }>(
        `${API_URL}/reset-password/${token}`, 
        { password },
   
      );
  
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
  
      set({
        error: axiosError.response?.data?.message || 
               (axiosError.request ? "No response from server. Check your connection." : axiosError.message) || 
               "Error resetting password",
        isLoading: false
      });
  
      throw error; // Re-throw to handle it in UI
    }
  },
}));

