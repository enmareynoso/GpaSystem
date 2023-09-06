import axios from "axios";
import Cookies from "js-cookie"; // Import the js-cookie library

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const createAccount = async (currentBalance, userId, jwtToken) => {
  try {
    const accountData = {
      current_balance: currentBalance,
      user: userId,
    };

    const { data } = await axios.post(
      `${API_BASE_URL}/create-account/`,
      accountData,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error Response:", error.response);
    throw new Error("Failed to create account");
  }
};
