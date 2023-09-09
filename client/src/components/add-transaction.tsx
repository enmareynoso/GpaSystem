import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { useToast } from "@/components/ui/use-toast"
import { RootState } from '../../Redux/store'; 
import { useAppDispatch, useAppSelector } from '@/app/reduxHooks';
import { createTransaction } from "../api/createTransaction";
import { useState, } from "react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { transactionSchema } from "@/validators/validator"



type Input = z.infer<typeof transactionSchema>

export function AddTransaction() {

  const accounts = useAppSelector((state: RootState) => state.accounts.accounts);
  const { toast } = useToast();


  const form = useForm<Input>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      account_id: "",
      amount: "",
      note: "",
      transaction_type: "Debit"
    }
  })

  
function onSubmit(data: Input) {
  createTransaction(data)
    .then((createdTransaction) => {
      toast({
        title: "Transaction created successfully!",
        description: "Check transactions tab for more information",
      });
      console.log("Transaction created:", createdTransaction);
    })
    .catch((error) => {
      if (error.response && error.response.status === 400) {
        toast({
          variant: "destructive",
          title: "Insufficient balance",
          description: "Looks like the account do not have enough balance to complete the transaction",
        });
      } else {
        console.error("Error creating transaction:", error);
      }
    });
}


  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3">
    <Card className="w-[350px]">
      
      <CardHeader>
        <CardTitle>Add transaction</CardTitle>
        <CardDescription>Make a transaction for one of your accounts.</CardDescription>
      </CardHeader>
      <CardContent>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="75.23" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
              />          
       <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Input placeholder="'Starbucks'" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
              />
         <FormField
          control={form.control}
          name="transaction_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Type</FormLabel>
              <FormControl>
                <Input placeholder="Debit or Credit" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
              />
               <FormField
          control={form.control}
          name="account_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {accounts.length === 0 ? (
                <SelectItem value="not-found" disabled>
                       No accounts found
                  </SelectItem>
                    ) : (
                    accounts.map((account) => (
                 <SelectItem key={account.id} value={String(account.id)}>
                  {account.account_number}
                 </SelectItem>
        ))
      )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
            
        <Button type="submit">Submit</Button>
      </form>
    </Form>
      </CardContent>
     
      </Card>
      </div>
  )
}
  