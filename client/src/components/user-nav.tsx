import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useSWR from 'swr';
import { ModeToggle } from "@/components/ui/toggle"
import Link from "next/link"
import { logoutUser } from "@/api/auth";
import { getUserProfile } from "@/api/userData";
import { useEffect } from "react";



export function UserNav() {
  
  const { data, error } = useSWR('api/user', getUserProfile);


  if (error) {
    return <p>Error loading user data</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

    return (
      <DropdownMenu>
          <ModeToggle />
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{data.name[0]}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{data.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {data.username}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href ="login" onClick={logoutUser}>Logout</Link>
            
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }