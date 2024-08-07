"use client"
import { BarChart2, Calendar, Layers2, ListFilterIcon, OrbitIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useContext, useEffect, useState } from "react"
import { format } from "date-fns"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import useQuery from "@/hooks/use-query"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import { useRouter } from "next/navigation"
import { uiConstants } from "@/constants/global-constants"
import Suspense from "@/components/suspense"
import Loading from "@/components/loading"
import Error from "@/components/error"

enum Filters {
  ALL = "All",
  ANALYTICS = "Analytics",
  GENAI = "Gen AI",
  DATA = "Data",
  BLOCKCHAIN = "Blockchain",
}

export default function Page() {
  const [{ userState }] = useContext(GlobalContext)
  const [selectedFilter, setSelectedFilter] = useState(Filters.ALL)
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=${userState.searchQuery}&category=${selectedFilter}`, HTTPMethods.GET)
  const pricingDetails = useQuery(["pricing"], endPoints.getSubscriptionConfig, HTTPMethods.GET)
  const currentPlan = pricingDetails?.data?.find((plan: any) => plan.planName === userState.selectedPlan)
  const router = useRouter()

  const renderProducts = products?.data?.map((product: any) => {
    return (
      <TableRow className="cursor-pointer" key={product.displayName} onClick={(): void => router.push(`/products/${product.productName}`)}>
        <TableCell><div dangerouslySetInnerHTML={{ __html: product?.productIcon }} className="scale-75" /></TableCell>
        <TableCell><div className="font-medium">{uiConstants.brandName} {product?.displayName}</div></TableCell>
        <TableCell className="text-neutral-500 hidden md:table-cell">{product?.description}</TableCell>
        <TableCell className="hidden md:table-cell">{product?.productStatus}</TableCell>
        <TableCell className="text-right"><Badge variant="outline"><Layers2 className="scale-50" />{product?.productCategory}</Badge></TableCell>
      </TableRow >
    )
  })

  return (
    <Suspense condition={!products.isLoading && !pricingDetails.isLoading} fallback={<Loading />}>
      <Suspense condition={!products.error && !pricingDetails.error} fallback={<Error />}>
        <div className="flex min-h-screen w-full flex-col">
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card className="sm:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Selected Subscription
                  </CardTitle>
                  <OrbitIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold uppercase">{userState.hasActiveSubscription ? userState.selectedPlan : "NONE"}</div>
                  <p className="text-sm text-slate-600">
                    Your current plan
                  </p>
                </CardContent>
                <CardFooter className="-mt-3">
                  <Button onClick={(): void => router.push("/subscription")}>View Subscription</Button>
                </CardFooter>
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
                  <div className="text-2xl font-bold">{userState.hasActiveSubscription ? `${userState.remainingCredits} / ${currentPlan?.grantedCredits}` : "No Usage Data"}</div>
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
                          Category Filter
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Category Filter</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked={selectedFilter === Filters.ALL} onClick={(): void => setSelectedFilter(Filters.ALL)}>All</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked={selectedFilter === Filters.ANALYTICS} onClick={(): void => setSelectedFilter(Filters.ANALYTICS)}>Analytics</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked={selectedFilter === Filters.GENAI} onClick={(): void => setSelectedFilter(Filters.GENAI)}>Gen AI</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked={selectedFilter === Filters.DATA} onClick={(): void => setSelectedFilter(Filters.DATA)}>Data</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked={selectedFilter === Filters.BLOCKCHAIN} onClick={(): void => setSelectedFilter(Filters.BLOCKCHAIN)}>Blockchain</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead></TableHead>
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
    </Suspense>
  )
}
