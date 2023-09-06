import React, { useEffect } from 'react';
import { fetchAccounts, deleteAccount} from '../../Redux/Accounts/Action';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDemo } from './alert';
import { RootState } from '../../Redux/store'; 
import { Account } from "../../Redux/Accounts/Reducer"
import { useAppDispatch, useAppSelector } from '@/app/reduxHooks';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"




export function CardWithAccounts() {
  const dispatch = useAppDispatch();

  const handleDeleteAccount = async (accountNumber: string) => {
    try {
      // Dispatch the deleteAccount action with the account_number

      await dispatch(deleteAccount(accountNumber));
      console.log(`Account ${accountNumber} deleted successfully`);
      dispatch(fetchAccounts());
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  // Fetch accounts when the component mounts
  useEffect(() => {
    dispatch(fetchAccounts())
  }, [dispatch]);

  // Get the accounts from Redux
  const accounts = useAppSelector((state: RootState) => state.accounts.accounts);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {accounts.length === 0 ? (
        <AlertDemo />
      ) : (
        accounts.map((account) => (
          <div key={account.account_number}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {account.account_number}
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${account.current_balance}</div>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <div className="flex items-start justify-start flex-col"> 
                      <Badge variant="destructive">Delete</Badge>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteAccount(account.account_number)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </div>
        ))
      )}
    </div>
  )
};