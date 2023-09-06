import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchAccounts = createAsyncThunk('account/fetchAccounts', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/list-accounts/`, {
      withCredentials: true, 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteAccount = createAsyncThunk('account/deleteAccount', async (accountNumber:string, thunkAPI) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete-account/${accountNumber}`, {
      withCredentials: true,
    });
    return accountNumber;
  } catch (error) {
    throw error;
  }
});