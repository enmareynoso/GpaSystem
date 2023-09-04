import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



export const fetchAccounts = createAsyncThunk('account/fetchAccounts', async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/list-accounts', {
      withCredentials: true, 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});