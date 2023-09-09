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
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/reduxHooks';
import { fetchTransactions } from "../../Redux/Transactions/Action"
import { RootState } from '../../Redux/store'; 
import { DatePicker } from "@/components/ui/date-picker"
import { fetchBalance } from "@/api/fetchBalance"
import { useToast } from "@/components/ui/use-toast"
import { ToastWithTitle } from "@/components/ui/toast-title"




function BalancePage() {

  const [date, setDate] = React.useState<Date | undefined>(undefined); // Initialize with undefined
  const [balanceData, setBalanceData] = React.useState<BalanceItem[]>([]);
  const { toast } = useToast();
  
  interface BalanceItem {
    Date: string;
    Transaction_Type: string;
    Account_Number: string;
    Note: string;
    Amount: number;
    Balance: number;
  }

  const handleDateSelected = (selectedDate: Date | undefined) => {
    if (selectedDate === undefined ) {
  
    } else {
      setDate(selectedDate);
    }
  };

  const handleFetchBalance = async () => {
    try {
      if (!date) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request. Select a date and try again.",
        });
        return; 
      }
  
      console.log("Fetching balance...");
      const response = await fetchBalance(date);
  
      if (response.length === 0) {
        toast({
          description: "There is no data matching your search",
  
        });
      } else {
        setBalanceData(response);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
      toast({
        title: "Error",
        description: "An error occurred while fetching balance data.",

      });
    }
  };
 
  return (
        <>
            
            
          <div className="md:hidden">
            <Image
              src="/examples/dashboard-light.png"
              width={1280}
              height={866}
              alt="Dashboard"
              className="block dark:hidden"
            />
            <Image
              src="/examples/dashboard-dark.png"
              width={1280}
              height={866}
              alt="Dashboard"
              className="hidden dark:block"
            />
          </div>
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
                <h2 className="text-3xl font-bold tracking-tight">Movements</h2>
              <div className="flex items-center space-x-2">
                <Link href="/transactions"><Button>Go back</Button></Link>
                </div>
                    </div>
                    <div className="flex items-center justify-center"> 
                    <Popover>
                <PopoverTrigger asChild>
                  <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateSelected}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              <Button variant="ghost" onClick={handleFetchBalance}>Submit</Button>
                    </div>
                    <div className="flex items-center justify-center space-y-2">
                    <Table>
                  <TableCaption> </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Transaction type</TableHead>
                      <TableHead>Account number</TableHead>
                      <TableHead>Note</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Balance</TableHead>           
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {balanceData.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell>{item.Date}</TableCell>
                                  <TableCell>{item.Transaction_Type}</TableCell>
                                  <TableCell>{item.Account_Number}</TableCell>
                                  <TableCell>{item.Note}</TableCell>
                                  <TableCell>
                                  {item.Transaction_Type === 'Credit' ? '+ ' : '- '}
                                    {item.Amount}
                                  </TableCell>
                                  <TableCell>{item.Balance}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                     </div>
            
                
            </div>
          </div>
          </>
      )
    }
    

export default requireAuth(BalancePage);