// src/api/auth.js
import axios from "axios";
import cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "An error occurred during registration.";
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || "An error occurred during login.";
  }
};

export const logoutUser = () => {
  // Remove the JWT cookie
  cookies.remove("jwt");

  // Redirect to the login page
  window.location.replace("/login");
};
