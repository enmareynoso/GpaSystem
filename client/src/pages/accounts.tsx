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
import PrivateRoute from '../../middleware/PrivateRoute'
import { CardWithForm } from "@/components/account-form"
import { CardWithAccounts } from "@/components/account-list"
import { AddTransaction } from "@/components/add-transaction"



function AccountsPage() {

  return (
    <>
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
            <h2 className="text-3xl font-bold tracking-tight">Accounts overview</h2>
            <div className="flex items-center space-x-2">
              <Link href="/transactions"><Button>View transactions</Button></Link>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Accounts</TabsTrigger>
              <TabsTrigger value="create-account" > Create Account </TabsTrigger>
              <TabsTrigger value="add-transaction" > Add transaction </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
             <CardWithAccounts></CardWithAccounts>
            </TabsContent>
            <TabsContent value="create-account" className="space-y-4">
              <CardWithForm></CardWithForm>
            </TabsContent>
            <TabsContent value="add-transaction" className="space-y-4">
            <AddTransaction></AddTransaction>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
export default AccountsPage;
