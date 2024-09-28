"use client"
import { Wallet, Layers2, ListFilter, Orbit, Sparkles, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "@/context/globalstate.provider"
import useQuery from "@/hooks/use-query"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import { useRouter } from "next/navigation"
import { brandName, uiConstants } from "@/constants/global-constants"
import Suspense from "@/components/suspense"
import LoadingComponent from "@/components/loading"
import ErrorComponent from "@/components/error"
import { Input } from "@/components/ui/input"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"

export default function Page() {
  const [{ userState }] = useContext(GlobalContext)
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [searchString, setSearchString] = useState("")
  const solutions = useQuery(["solutions"], endPoints.getSolutionConfig, HTTPMethods.GET)
  const products = useQuery(["products", selectedFilter], `${endPoints.getProductConfig}?searchQuery=${searchString}&category=${selectedFilter}`, HTTPMethods.GET)
  const router = useRouter()
  useEffect(() => { if (!searchString) products.refetch() }, [searchString])

  const renderProducts = products?.data?.map((product: any) => {
    return (
      <TableRow
        className="cursor-pointer"
        key={product.displayName}
        onClick={(): void => product?.productStatus === "Available" ? router.push(`/products/${product.productName}`) : undefined}
      >
        <TableCell><div dangerouslySetInnerHTML={{ __html: product?.productIcon }} className="scale-75" /></TableCell>
        <TableCell><div className="font-medium">{brandName} {product?.displayName}</div></TableCell>
        <TableCell className="text-zinc-500 hidden md:table-cell">{product?.description}</TableCell>
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
        <Breadcrumb className="-mt-2 -mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card className="cursor-pointer" onClick={(): void => router.push("/settings/user")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {brandName}
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Hey, {userState.name.split(" ")[0]}</div>
              <p className="text-sm text-zinc-600">
                Welcome to your dashboard
              </p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer" onClick={(): void => router.push("/settings/organization")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Organization
              </CardTitle>
              <Orbit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userState.selectedOrgName}
              </div>
              <p className="text-sm text-zinc-600">
                Your current organization
              </p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer" onClick={(): void => router.push("/settings/wallet")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$ {userState.walletBalance.toFixed(2)}</div>
              <p className="text-sm text-zinc-600">
                Credits remaining
              </p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer" onClick={(): void => router.push("/settings/compute")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compute Tier</CardTitle>
              <Layers2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{userState.computeTier}</div>
              <p className="text-sm text-zinc-600">
                Current compute tier
              </p>
            </CardContent>
          </Card>
        </div>
        <Card className="xl:col-span-2 -mt-4">
          <CardHeader className="px-7">
            <div className="flex justify-between">
              <div>
                <CardTitle>Products</CardTitle>
                <p className="text-sm text-zinc-600 mt-1">Product offerings by {brandName}</p>
              </div>
              <div>
                <Suspense condition={!searchString} fallback={null}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
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
                </Suspense>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); products.refetch() }} className="ml-auto mt-4 flex-1 sm:flex-initial justify-end">
              <div className="relative">
                <Sparkles className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                <Input
                  autoFocus
                  defaultValue={searchString}
                  onChange={(e): void => setSearchString(e.target.value)}
                  type="search"
                  placeholder="Type anything and press enter to get suggested products powered by AI"
                  className="mb-4 pl-8 w-full h-12 bg-zinc-50 focus:outline-none"
                />
                <p className="text-xs text-zinc-500 -mt-2 mb-2">{uiConstants.aiSafetyStatement}</p>
              </div>
            </form>
            <Suspense condition={!products.isRefetching} fallback={<p className="text-center">Generating best products suggestions for you</p>}>
              <Suspense condition={products?.data?.length > 0} fallback={<p className="text-center">No products to display</p>}>
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
              </Suspense>
            </Suspense>
          </CardContent>
        </Card>
      </Suspense>
    </Suspense>
  )
}
