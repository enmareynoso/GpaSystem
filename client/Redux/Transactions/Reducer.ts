import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchTransactions } from './Action';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Transaction {
  id: number;
  date: string; 
  transaction_type: string;
  account_number: string; 
  note: string;
  amount: number; 
}


interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionsState = {
  transactions: [], // Initialize as an empty array
  loading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      return { ...state, transactions: action.payload };
    },
  },
});

export const { setTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;