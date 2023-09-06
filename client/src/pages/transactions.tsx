import { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import requireAuth from '../../middleware/PrivateRoute'
import { Combobox } from "@/components/ui/combo-box"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
}

function TransactionsPage() {

    return (
        <>
          <div className="md:hidden">
            <Image
              src="/examples/dashboard-light.png"
              width={1280}
              height={866}
              alt="Dashboard"
              className="block dark:hidden"
            />
            <Image
              src="/examples/dashboard-dark.png"
              width={1280}
              height={866}
              alt="Dashboard"
              className="hidden dark:block"
            />
          </div>
          <div className="hidden flex-col md:flex">
            <div className="border-b">
              <div className="flex h-16 items-center px-4">
                {/* <TeamSwitcher /> */}
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                  {/* <Search /> */}
                  <UserNav />
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-4 p-8 pt-6">
              <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Transactions overview</h2>
                <div className="flex items-center space-x-2">
                <Link href="/accounts"><Button>Go back</Button></Link>
                </div>
              </div>
              
                    <Combobox></Combobox>
                    <Table>
  <TableCaption>A list of your recent Transactions.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">ID</TableHead>
      <TableHead>Date</TableHead>
      <TableHead>Transaction type</TableHead>
      <TableHead >Account number</TableHead>
      <TableHead>Note</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
    </TableRow>
    
  </TableBody>
</Table>
                
            </div>
          </div>
          </>
      )
    }
    

export default requireAuth(TransactionsPage);
