"use client"
import Link from "next/link"
import { ArrowUpRight, BarChart2, Calendar, CalendarCheck2Icon, CheckCircle, OrbitIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { useContext, useState } from "react"
import { format } from "date-fns"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import useQuery from "@/hooks/use-query"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import { useRouter } from "next/navigation"
import { uiConstants } from "@/constants/global-constants"
import Suspense from "@/components/suspense"

export default function Page() {
  const [{ userState }] = useContext(GlobalContext)
  const [queryId, setQueryId] = useState("DQID")
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=`, HTTPMethods.GET)
  const pricingDetails = useQuery(["pricing"], endPoints.getSubscriptionConfig, HTTPMethods.GET)
  const myWorkspaces = useQuery(["workspaces", queryId], endPoints.findMyWorkspaces, HTTPMethods.GET)
  const currentPlan = pricingDetails?.data?.find((plan: any) => plan.planName === userState.selectedPlan)
  const router = useRouter()

  const switchWorkspace = async (workspaceId: string): Promise<void> => {

  }

  const renderProducts = products?.data?.slice(0, 3).map((product: any) => {
    return (
      <TableRow className="cursor-pointer" key={product.displayName} onClick={(): void => router.push(`/products/${product.productName}`)}>
        <TableCell>
          <div className="font-medium">{uiConstants.brandName} {product?.displayName}</div>
          <div className="hidden text-sm text-muted-foreground md:inline">
            {product?.productStatus}
          </div>
        </TableCell>
        <TableCell className="text-right"><Badge variant="outline">{product?.productCategory}</Badge></TableCell>
      </TableRow>
    )
  })

  const renderWorkspaces = myWorkspaces?.data?.myWorkspaces?.map((workspace: any) => {
    return (
      <div className="flex items-center gap-4" key={workspace._id}>
        <Avatar className="hidden h-9 w-9 sm:flex">
          <AvatarFallback>WS</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <p className="text-sm font-medium leading-none">
            {workspace.name}
          </p>
          <p className="text-sm text-muted-foreground">
            Hello
          </p>
        </div>
        <div className="ml-auto font-medium">
          <Button variant="outline" disabled={userState.selectedWorkspaceId === workspace._id} className="btn-block" onClick={(): Promise<void> => switchWorkspace(workspace._id)}>
            <Suspense condition={userState.selectedWorkspaceId !== workspace._id} fallback={<>Selected</>}>
              Switch
            </Suspense>
          </Button>
        </div>
      </div>
    )
  })

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Selected Subscription
              </CardTitle>
              <OrbitIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{userState.hasActiveSubscription ? userState.selectedPlan : "No Active Subscription"}</div>
              <p className="text-xs text-muted-foreground">
                Your current plan
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Start Date
              </CardTitle>
              <CalendarCheck2Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userState.hasActiveSubscription ? format(new Date(userState.createdAt), "MMM, do yyyy") : "No Validity Data"}</div>
              <p className="text-xs text-muted-foreground">
                Plan start date
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valid Upto</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userState.hasActiveSubscription ? format(new Date(userState.expiresAt), "MMM, do yyyy") : "No Validity Data"}</div>
              <p className="text-xs text-muted-foreground">
                Plan end date
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscription Usage</CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userState.hasActiveSubscription ? `${userState.remainingCredits} / ${currentPlan?.grantedCredits}` : "No Subscriptions Usage Data"}</div>
              <p className="text-xs text-muted-foreground">
                Credits remaining
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Products</CardTitle>
                <CardDescription>
                  Our Offerings
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/products">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {renderProducts}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Workspaces</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              {renderWorkspaces}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
