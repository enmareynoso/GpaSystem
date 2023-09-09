import * as React from "react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { accountSchema, transactionSchema } from "@/validators/validator"
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
import { createAccount } from "@/api/createAccount";
import Cookies from "js-cookie"; 
import { getJWTFromCookie, getUserIdFromJWT } from "@/lib/jwtUtils"


type Input = z.infer<typeof accountSchema>

export function CardWithForm() {

  const { toast } = useToast();
 
  const form = useForm<Input>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
    current_balance: "", 
    }
  })
  
  function onSubmit(data: Input) {
    const jwtToken = getJWTFromCookie(); // Get the JWT token
    const userId = getUserIdFromJWT(jwtToken); // Get the user ID from the JWT token
  
    createAccount(data.current_balance, userId, jwtToken)
      .then((createdAccount) => {
        toast({
          title: "Account created successfully!",
          description: "Your new account has been created.",
        });
        console.log("Account created:", createdAccount);
      })
      .catch((error) => {
         console.log("Error response:", error)
      });
  }


  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3">
    <Card className="w-[350px]">
      
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>Make an account at Finally</CardDescription>
      </CardHeader>
      <CardContent>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
          control={form.control}
          name="current_balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Balance</FormLabel>
              <FormControl>
                <Input placeholder="00.00"  {...field} />
              </FormControl>
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
  