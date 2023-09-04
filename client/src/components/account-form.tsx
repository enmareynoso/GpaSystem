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
} from "@/components/ui/select";
import { createAccount } from "@/api/createAccount"; 

export function CardWithForm() {
  const [accountnumber, setAccountNumber] = React.useState("");
  const [currentbalance, setCurrentBalance] = React.useState("");
  const [confirmation, setConfirmation] = React.useState(false);

  const handleCreateAccount = async () => {
    try {
      const response = await createAccount({
        account_number: accountnumber,
        current_balance: currentbalance,
      });

      setAccountNumber("");
      setCurrentBalance("");
      setConfirmation(true);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>Create an account at finally in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        {confirmation && (
          <div className="mb-4 text-green-500">
            Account created successfully!
          </div>
        )}
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Balance</Label>
              <Input
                type="money"
                id="currentbalance"
                value={currentbalance}
                // onChange={(e) => setCurrentBalance(formatCurrentBalance(e.target.value))}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleCreateAccount}>Create</Button>
      </CardFooter>
    </Card>
  );
}

