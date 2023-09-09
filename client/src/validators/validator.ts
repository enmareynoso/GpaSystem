import { z } from "zod"

export const transactionSchema = z.object({
  account_id: z.string().nonempty("Account field required"),
  transaction_type: z.enum(['Debit', 'Credit', 'DEBIT', 'CREDIT']),
  note: z.string().nonempty("Note field required").max(10,{message: "You have reached more than 20 characters on this field. Enter a shorter note"}),
  amount: z.string().nonempty("Amount field required").regex(/^\d{1,10}(\.\d{1,2})?$/, { message: "Invalid amount format. The value must include not more than 5 numbers and 2 decimal places" }), 
});
  

export const accountSchema = z.object({
  current_balance:  z.string().nonempty("This field is required").regex(/^\d{1,10}(\.\d{1,2})?$/, { message: "Invalid amount format. The value must include not more than 5 numbers and 2 decimal places" })
});