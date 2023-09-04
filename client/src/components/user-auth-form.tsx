"use client"
import * as React from "react"

import { registerUser } from "@/api/auth";
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"




interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  
  

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setSuccessMessage(null);
    setErrorMessage(null)



    try {
      const userData = {
        name,
        username,
        password,
      };

      const response = await registerUser(userData);

      // Registration successful, you can display a success message
      console.log("Registration successful:", response);

      setSuccessMessage("User created successfully!");


    } catch (error) {
      // Registration failed, display an error message
      const errorData = error as { username?: string[] };
      if (errorData.username && errorData.username[0]) {
        setErrorMessage(errorData.username[0]);
      } else {
        setErrorMessage("An error occurred during registration.");
      }
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className={cn("grid gap-6", className)} {...props}>
       {errorMessage && (
      <p className="text-red-500 text-sm mt-2-center">{errorMessage}</p>
      )}
      {successMessage && (
      <p className="text-green-500 text-sm mt-2-center">{successMessage}</p>
    )}
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              type="text"
              value={name} // Bind value to state
              onChange={(e) => setName(e.target.value)} // Update state on change
              autoCapitalize="none"
              autoComplete="none"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Label className="sr-only" htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Username"
              type="text"
              value={username} // Bind value to state
              onChange={(e) => setUsername(e.target.value)} // Update state on change
              autoCapitalize="none"
              autoComplete="none"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              value={password} // Bind value to state
              onChange={(e) => setPassword(e.target.value)} // Update state on change
              autoCapitalize="none"
              autoComplete="none"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
        </div>
      </div>
    </div>
  )
}