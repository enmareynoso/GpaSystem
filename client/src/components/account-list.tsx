import React, { useEffect } from 'react';
import { fetchAccounts, deleteAccount} from '../../Redux/Accounts/Action';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AccountsAlert } from './accounts-alert';
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

 


  useEffect(() => {
    dispatch(fetchAccounts())
  }, [dispatch]);

  const accounts = useAppSelector((state: RootState) => state.accounts.accounts);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {accounts.length === 0 ? (
        <AccountsAlert />
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
              </CardContent>
            </Card>
          </div>
        ))
      )}
    </div>
  )
};