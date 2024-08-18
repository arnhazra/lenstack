"use client"
import { BadgeDollarSignIcon, BarChart2, Computer, DollarSign, Kanban, ListFilterIcon, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import LoadingComponent from "@/components/loading"
import ErrorComponent from "@/components/error"
import CurrentOrgCard from "@/components/currentorgcard"

export default function Page() {
  const [{ userState }] = useContext(GlobalContext)
  const [selectedFilter, setSelectedFilter] = useState("All")
  const solutions = useQuery(["solutions"], endPoints.getSolutionConfig, HTTPMethods.GET)
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=${userState.searchQuery}&category=${selectedFilter}`, HTTPMethods.GET)
  const router = useRouter()

  const renderProducts = products?.data?.map((product: any) => {
    return (
      <TableRow
        className="cursor-pointer"
        key={product.displayName}
        onClick={(): void => product?.productStatus === "Available" ? router.push(`/products/${product.productName}`) : undefined}
      >
        <TableCell><div dangerouslySetInnerHTML={{ __html: product?.productIcon }} className="scale-75" /></TableCell>
        <TableCell><div className="font-medium">{uiConstants.brandName} {product?.displayName}</div></TableCell>
        <TableCell className="text-slate-500 hidden md:table-cell">{product?.description}</TableCell>
        <TableCell className="hidden md:table-cell">{product?.productStatus}</TableCell>
        <TableCell className="text-right">
          <Badge variant="outline">
            <div className="scale-50" dangerouslySetInnerHTML={{ __html: solutions?.data?.find((solution: any) => solution?.solutionName === product?.productCategory)?.solutionIcon }}></div>
            {product?.productCategory}
          </Badge>
        </TableCell>
      </TableRow >
    )
  })

  const renderSolutions = solutions?.data?.map((solution: any) => {
    return (
      <DropdownMenuCheckboxItem
        key={solution?.solutionName}
        checked={selectedFilter === solution?.solutionName}
        onClick={(): void => setSelectedFilter(solution?.solutionName)}
      >
        {solution?.solutionName}
      </DropdownMenuCheckboxItem>
    )
  })

  return (
    <Suspense condition={!products.isLoading} fallback={<LoadingComponent />}>
      <Suspense condition={!products.error} fallback={<ErrorComponent />}>
        <div className="flex min-h-screen w-full flex-col">
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {uiConstants.brandName}
                  </CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Hey, {userState.name.split(" ")[0]}</div>
                  <p className="text-sm text-slate-600">
                    Welcome to your dashboard
                  </p>
                </CardContent>
                <CardFooter className="-mt-3">
                  <Button onClick={(): void => router.push("/account")}>My Account</Button>
                </CardFooter>
              </Card>
              <CurrentOrgCard />
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
                  <BadgeDollarSignIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$ {userState.walletBalance.toFixed(2)}</div>
                  <p className="text-sm text-slate-600">
                    Credits remaining
                  </p>
                </CardContent>
                <CardFooter className="-mt-3">
                  <Button onClick={(): void => router.push("/account?tab=wallet")}>Open Wallet</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Compute Tier</CardTitle>
                  <Computer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold capitalize">{userState.computeTier}</div>
                  <p className="text-sm text-slate-600">
                    Current compute tier
                  </p>
                </CardContent>
                <CardFooter className="-mt-3">
                  <Button onClick={(): void => router.push("/account?tab=compute")}>Change Settings</Button>
                </CardFooter>
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
                          Select Category
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Category Filter</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem
                        checked={selectedFilter === "All"}
                        onClick={(): void => setSelectedFilter("All")}
                      >
                        All
                      </DropdownMenuCheckboxItem>
                      {renderSolutions}
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
