"use client"
import { BarChart2, Calendar, CalendarCheck2Icon, ListFilterIcon, OrbitIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback } from "@radix-ui/react-avatar"
import { useContext, useState } from "react"
import { format } from "date-fns"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import useQuery from "@/hooks/use-query"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import { useRouter } from "next/navigation"
import { uiConstants } from "@/constants/global-constants"
import Suspense from "@/components/suspense"
import SkeletonLoading from "@/components/skeleton"
import axios from "axios"
import toast from "react-hot-toast"
import { usePromptContext } from "@/context/providers/prompt.provider"

enum Filters {
  ALL = "All",
  CEN = "Centralized",
  DCE = "Decentralized"
}

export default function Page() {
  const [{ userState, appState }, dispatch] = useContext(GlobalContext)
  const [queryId, setQueryId] = useState("DQID")
  const [selectedFilter, setSelectedFilter] = useState(Filters.ALL)
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=${appState.globalSearchString}&category=${selectedFilter}`, HTTPMethods.GET)
  const pricingDetails = useQuery(["pricing"], endPoints.getSubscriptionConfig, HTTPMethods.GET)
  const myWorkspaces = useQuery(["workspaces", queryId], endPoints.findMyWorkspaces, HTTPMethods.GET)
  const currentPlan = pricingDetails?.data?.find((plan: any) => plan.planName === userState.selectedPlan)
  const router = useRouter()
  const { prompt } = usePromptContext()

  const createWorkspace = async () => {
    const { hasConfirmed, value } = await prompt("New Workspace Name")

    if (hasConfirmed && value) {
      try {
        await axios.post(endPoints.createWorkspace, { name: value })
        setQueryId(Math.random().toString())
        toast.success("Workspace created")
      }

      catch (error) {
        toast.error("Workspace creation failed")
      }
    }
  }

  const switchWorkspace = async (workspaceId: string) => {
    try {
      await axios.post(`${endPoints.switchWorkspace}?workspaceId=${workspaceId}`)
      dispatch("setAppState", { refreshId: Math.random().toString(36).substring(7) })
      toast.success("Workspace switched")
    }

    catch (error) {
      toast.error("Workspace switching failed")
    }
  }

  const renderProducts = products?.data?.map((product: any) => {
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
    <Suspense condition={!products.isLoading && !myWorkspaces.isLoading && !pricingDetails.isLoading} fallback={<SkeletonLoading />}>
      <div className="flex min-h-screen w-full flex-col">
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Button variant="outline" className="ml-auto flex items-center">Create Workspace</Button>
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
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <ListFilterIcon className="h-3.5 w-3.5" />
                        <span>
                          Filter
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked={selectedFilter === Filters.ALL} onClick={(): void => setSelectedFilter(Filters.ALL)}>All</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked={selectedFilter === Filters.CEN} onClick={(): void => setSelectedFilter(Filters.CEN)}>Centralized</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked={selectedFilter === Filters.DCE} onClick={(): void => setSelectedFilter(Filters.DCE)}>Decentralized</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
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
    </Suspense>
  )
}
