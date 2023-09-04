import React, { useEffect } from 'react';
import { fetchAccounts } from '../../Redux/Accounts/Action';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDemo } from './alert';
import { RootState } from '../../Redux/store'; 
import { Account } from "../../Redux/Accounts/Reducer"
import { useAppDispatch, useAppSelector } from '@/app/reduxHooks';

export function CardWithAccounts() {
  const dispatch = useAppDispatch();

  // Fetch accounts when the component mounts
  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  // Get the accounts from Redux
  const accounts = useAppSelector((state: RootState) => state.accounts.accounts);

  return (
    <div>
      {accounts.length === 0 ? (
        // Display this when there are no accounts
        <AlertDemo />
      ) : (
        // Map through accounts and render a card component for each account
        accounts.map((account: Account) => (
          <Card key={account.account_number}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Account: {account.account_number}
              </CardTitle>
              {/* Add any other information you want to display */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${account.current_balance}</div>
              {/* Add any other information you want to display */}
            </CardContent>
            {/* Add any other components for the card footer */}
          </Card>
        ))
      )}
    </div>
  );
}