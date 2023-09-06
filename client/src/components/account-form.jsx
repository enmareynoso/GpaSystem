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
import { createAccount } from "@/api/createAccount";
import Cookies from "js-cookie"; 
import {getJWTFromCookie, getUserIdFromJWT} from "@/lib/jwtUtils"

export function CardWithForm() {
  const [currentBalance, setCurrentBalance] = React.useState("");
  const [confirmation, setConfirmation] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleCreateAccount = async () => {
    try {
      const jwtToken = getJWTFromCookie();

      const userId = getUserIdFromJWT(jwtToken);

      if (!userId) {
        console.error("User ID not found in JWT token.");
        return;
      }

      if (!currentBalance || isNaN(currentBalance)) {
        setError("Please enter a valid balance.");
        return;
      }

      

      // Call the createAccount function to send a POST request with the JWT token
      await createAccount(currentBalance, userId, jwtToken);

      // Handle success
      setConfirmation(true);
      setCurrentBalance("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Create an account with the form below.</CardDescription>
        </CardHeader>
        <CardContent>
          {confirmation && (
            <div className="mb-4 text-green-500">
              Account created successfully!
            </div>
          )}
          {error && (
            <div className="mb-4 text-red-500">
              {error}
            </div>
          )}
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="currentBalance">Balance</Label>
                <Input
                  type="number" 
                  id="currentBalance"
                  placeholder="Add account balance: Ex 500.32"
                  value={currentBalance}
                  onChange={(e) => setCurrentBalance(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleCreateAccount}>Create</Button>
        </CardFooter>
      </Card>
    </div>
  );
}