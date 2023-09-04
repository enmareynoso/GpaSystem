import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

export const fetchAccountsList = async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/list-accounts`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch accounts list");
  }
};
