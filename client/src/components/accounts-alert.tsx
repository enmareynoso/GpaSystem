import { QuestionMarkCircledIcon } from "@radix-ui/react-icons"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
 
export function AccountsAlert() {
  return (
    <Alert>
      <QuestionMarkCircledIcon className="h-4 w-4" />
      <AlertTitle>Accounts missing</AlertTitle>
      <AlertDescription>
        Looks like you dont have any accounts
      </AlertDescription>
    </Alert>
  )
}