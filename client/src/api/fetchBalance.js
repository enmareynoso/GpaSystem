import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchBalance = async (date) => {
  try {
    const response = await api.get("accounts/balance/", {
      params: {
        date: date.toISOString().split("T")[0], // Format date as 'YYYY-MM-DD'
      },
    });

    const movementsList = response.data.movements_list;

    console.log("Response from fetchBalance:", movementsList);
    return movementsList;
  } catch (error) {
    throw error;
  }
};
