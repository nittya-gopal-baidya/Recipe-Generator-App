import { create } from "zustand";
import axios from "axios";
// import { addFavorite } from "../../../server/controllers/user.controller";
const API_URL = "http://localhost:3000";
// const API_URL = import.meta.env.MODE==="development"?"http://localhost:3000/api/auth":"/api/auth";
axios.defaults.withCredentials = true;
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
message:null,
  register: async (email, password, username) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/api/users/register`, {
        email,
        password,
        username,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error while registering",
        isLoading: false,
      });
      throw error;
    }
  },
  
  checkAuth: async () => {
    await new Promise((resolve)=>setTimeout(resolve,1000));
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/api/users/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },
  login:async(email,password)=>{
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/api/users/login`, { email,password});
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
        await axios.post(`${API_URL}/api/users/logout`);
        set({ user: null, isAuthenticated: false, error: null, isLoading: false });
    } catch (error) {
        set({ error: "Error logging out", isLoading: false });
        throw error;
    }
},
// addFavorite
}));
