"use client"
import { BarChart2, Calendar, CalendarCheck2Icon, Layers2, ListFilterIcon, OrbitIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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

enum Filters {
  ALL = "All",
  CEN = "Centralized",
  DCE = "Decentralized"
}

export default function Page() {
  const [{ userState, appState }] = useContext(GlobalContext)
  const [selectedFilter, setSelectedFilter] = useState(Filters.ALL)
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=${appState.globalSearchString}&category=${selectedFilter}`, HTTPMethods.GET)
  const pricingDetails = useQuery(["pricing"], endPoints.getSubscriptionConfig, HTTPMethods.GET)
  const currentPlan = pricingDetails?.data?.find((plan: any) => plan.planName === userState.selectedPlan)
  const router = useRouter()

  const renderProducts = products?.data?.map((product: any) => {
    return (
      <TableRow className="cursor-pointer" key={product.displayName} onClick={(): void => router.push(`/products/${product.productName}`)}>
        <TableCell><div className="font-medium">{uiConstants.brandName} {product?.displayName}</div></TableCell>
        <TableCell className="text-neutral-500 hidden md:table-cell">{product?.description}</TableCell>
        <TableCell className="hidden md:table-cell">{product?.productStatus}</TableCell>
        <TableCell className="text-right"><Badge variant="default"><Layers2 className="scale-50" />{product?.productCategory}</Badge></TableCell>
      </TableRow >
    )
  })

  return (
    <Suspense condition={!products.isLoading && !pricingDetails.isLoading} fallback={<SkeletonLoading />}>
      <div className="flex min-h-screen w-full flex-col">
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
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
            <Card>
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
            <Card>
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
            <Card>
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
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Products</CardTitle>
                <CardDescription>
                  Product Offerings
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
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="text-right">Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {renderProducts}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </Suspense>
  )
}
