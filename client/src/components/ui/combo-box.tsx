"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RootState } from '../../../Redux/store'; 
import { useAppDispatch, useAppSelector } from '@/app/reduxHooks';


function formatAccountNumber(accountNumber: string) {
  // Replace spaces and format the account number as needed
  return accountNumber.replace(/\s/g, '');
}


export function Combobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const accounts = useAppSelector((state: RootState) => state.accounts.accounts);
  const isValueSet = !!value;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-[${isValueSet ? '250px' : '200px'}] justify-between`} 
        >
          {value ? (
            accounts.find((account) => account.account_number === value)?.account_number
          ) : (
            'Select account...'
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search account..." />
          <CommandEmpty>No account found</CommandEmpty>
          <CommandGroup>
            {accounts.map((account) => (
              <CommandItem
                key={account.account_number}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === account.account_number ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {account.account_number}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}