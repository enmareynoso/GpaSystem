import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAccounts } from './Action';

export interface Account {
  id: number
  account_number: string;
  current_balance: string;
}

interface AccountState {
  accounts: Account[];
  loading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  accounts: [],
  loading: false,
  error: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    accountDeleted: (state, action: PayloadAction<number>) => {
      // Find the index of the deleted account in the accounts array
      const deletedAccountIndex = state.accounts.findIndex(
        (account) => account.id === action.payload
      );

      if (deletedAccountIndex !== -1) {
        // Remove the deleted account from the accounts array
        state.accounts.splice(deletedAccountIndex, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAccounts.fulfilled, (state, action: PayloadAction<Account[]>) => {
        state.loading = false;
        state.accounts = action.payload;
        state.error = null;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred.';
      });
  },
});

export const { accountDeleted } = accountSlice.actions;

export default accountSlice.reducer;