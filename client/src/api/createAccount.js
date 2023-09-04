const API_BASE_URL = "http://localhost:8000/api";

export const createAccount = async (accountData) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/create-account/`,
      accountData,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    throw new Error("Failed to create account");
  }
};
