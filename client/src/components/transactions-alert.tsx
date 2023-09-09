import { QuestionMarkCircledIcon } from "@radix-ui/react-icons"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
 
export function TransactionsAlert() {
  return (
    <Alert>
      <QuestionMarkCircledIcon className="h-4 w-4" />
      <AlertTitle>Transactions missing</AlertTitle>
      <AlertDescription>
       Looks like you do not have any recent transactions
      </AlertDescription>
    </Alert>
  )
}