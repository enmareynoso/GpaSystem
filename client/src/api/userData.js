import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

export const getUserProfile = async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/user`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch user profile");
  }
};
