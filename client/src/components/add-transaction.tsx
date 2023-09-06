import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { RootState } from '../../Redux/store'; 
import { useAppDispatch, useAppSelector } from '@/app/reduxHooks';

export function AddTransaction() {

  const accounts = useAppSelector((state: RootState) => state.accounts.accounts);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Add transaction</CardTitle>
        <CardDescription>Make a transaction on account</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-3.5">
              <Label htmlFor="accounts">Account</Label>
              <Select>
                <SelectTrigger id="accounts">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {accounts.length === 0 ? (
                    <SelectItem value="not-found" disabled>
                      Accounts not found
                    </SelectItem>
                  ) : (
                    accounts.map((account) => (
                      <SelectItem key={account.account_number} value={account.account_number}>
                        {account.account_number}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" placeholder="Transaction amount" />
              <Label htmlFor="transaction-type">Transaction type</Label>
              <Select>
                <SelectTrigger id="transaction-type">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="CREDIT">Credit</SelectItem>
                  <SelectItem value="DEBIT">Debit</SelectItem>
                </SelectContent>
              </Select>
              <Label htmlFor="note">Note</Label>
              <Input id="note" placeholder="Add a note" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button>Add</Button>
      </CardFooter>
    </Card>
  );
}


