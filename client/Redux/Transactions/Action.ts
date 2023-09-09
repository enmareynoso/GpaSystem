import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '@/app/reduxHooks'
import { setTransactions } from './Reducer';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;




export const fetchTransactions = createAsyncThunk(
    'transactions/fetchTransactions',
    async (_, { dispatch }) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/accounts/transactions`, {
          withCredentials: true,
        });
        dispatch(setTransactions(response.data)); // Dispatch the action to set transactions
      } catch (error) {
        throw error;
      }
    }
  );