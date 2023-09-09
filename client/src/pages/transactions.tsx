import { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import requireAuth from '../../middleware/PrivateRoute'
import { Combobox } from "@/components/ui/combo-box"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/reduxHooks';
import { fetchTransactions } from "../../Redux/Transactions/Action"
import { RootState } from '../../Redux/store'; 
import { useToast } from "@/components/ui/use-toast"
import { TransactionsAlert } from "@/components/transactions-alert"



function TransactionsPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTransactions())
  }, [dispatch]);

  function formatDateTime(dateTimeString: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true, // Display time in 12-hour format with AM/PM
    };
    return new Date(dateTimeString).toLocaleString(undefined, options).replace(/\//g, '-')
  }

  const transactions = useAppSelector((state: RootState) => state.transactions.transactions);
  
 
    return (
      <>
      
          <div className="hidden flex-col md:flex">
            <div className="border-b">
              <div className="flex h-16 items-center px-4">
                {/* <TeamSwitcher /> */}
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                  {/* <Search /> */}
                  <UserNav />
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-4 p-8 pt-6">
              <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Transactions overview</h2>
              <div className="flex items-center space-x-2">
                
              <Link href="/movements"><Button variant="outline">Check balance</Button></Link>
                <Link href="/accounts"><Button>Go back</Button></Link>
                </div>
              </div>
              <div>
      {transactions.length === 0 ? (
        <TransactionsAlert />
      ) : (
        <Table>
          <TableCaption>A list of your recent Transactions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Transaction type</TableHead>
              <TableHead>Account number</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{formatDateTime(transaction.date)}</TableCell>
                <TableCell>{transaction.transaction_type}</TableCell>
                <TableCell>{transaction.account_number}</TableCell>
                <TableCell>{transaction.note}</TableCell>
                <TableCell>
                  {transaction.transaction_type === 'Credit' ? '+ ' : '- '}
                  {transaction.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>

                
            </div>
          </div>
          </>
      )
    }
    

export default requireAuth(TransactionsPage);
