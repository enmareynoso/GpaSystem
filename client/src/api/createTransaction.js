import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const createTransaction = async (transactionData) => {
  // Convert account_id to a number if it's a string
  const dataToSend = {
    ...transactionData,
    account_id:
      typeof transactionData.account_id === "string"
        ? parseInt(transactionData.account_id, 10)
        : transactionData.account_id,
  };

  try {
    const response = await axios.post(
      `${API_BASE_URL}/transactions/create/`,
      dataToSend,
      {
        withCredentials: true,
      }
    );

    // Assuming the server returns the created transaction data
    const createdTransaction = response.data;

    return createdTransaction;
  } catch (error) {
    console.error("Axios Error:", error);

    // Log the request data to see what's being sent
    console.log("Request Data:", {
      method: "POST",
      url: `${API_BASE_URL}/transactions/create`,
      data: dataToSend, // Log the data being sent
    });

    throw error; // Re-throw the error so that it's handled upstream
  }
};
