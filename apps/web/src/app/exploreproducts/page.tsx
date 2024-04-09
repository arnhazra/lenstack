"use client"
import { ListFilter, Box } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import useQuery from "@/hooks/use-query"
import { useRouter } from "next/navigation"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import { uiConstants } from "@/constants/global-constants"
import Suspense from "@/components/suspense"
import SkeletonLoading from "@/components/skeleton"

enum Filters {
  ALL = "All",
  CEN = "Centralized",
  DCE = "Decentralized"
}

export default function Page() {
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=`, HTTPMethods.GET)
  const router = useRouter()
  const [selectedFilter, setSelectedFilter] = useState(Filters.ALL)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      router.push("/products")
    }

    else {
      setIsLoading(false)
    }
  }, [])

  const productsToDisplay = products?.data?.map((product: any) => {
    return (
      <TableRow className="cursor-pointer" key={product.displayName} onClick={(): void => router.push(`/products/${product.productName}`)}>
        <TableCell className="hidden sm:table-cell">
          <Box />
        </TableCell>
        <TableCell className="font-medium">
          {uiConstants.brandName} {product?.displayName}
        </TableCell>
        <TableCell>
          <Badge variant="outline">{product?.productCategory}</Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Badge variant="outline">{product?.productStatus}</Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell text-zinc-500">
          {product?.description}
        </TableCell>
      </TableRow>
    )
  })

  return (
    <Suspense condition={!isLoading && !products.isLoading} fallback={<SkeletonLoading />}>
      <div className="flex flex-col">
        <div className="flex flex-col sm:gap-4 sm:py-4">
          <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue={Filters.ALL} value={selectedFilter}>
              <div className="flex items-center">
                <TabsList className="hidden sm:flex">
                  <TabsTrigger value={Filters.ALL} onClick={(): void => setSelectedFilter(Filters.ALL)}>All</TabsTrigger>
                  <TabsTrigger value={Filters.CEN} onClick={(): void => setSelectedFilter(Filters.CEN)}>Centralized</TabsTrigger>
                  <TabsTrigger value={Filters.DCE} onClick={(): void => setSelectedFilter(Filters.DCE)}>Decentralized</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
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
              </div>
              <TabsContent value={Filters.ALL}>
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>Products</CardTitle>
                    <CardDescription>
                      Manage your products and view their sales performance.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                          </TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead className="hidden md:table-cell">Status</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Description
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {productsToDisplay}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <div className="text-xs text-muted-foreground">
                      Showing <strong>{products.data?.length}</strong>{" "}products
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Suspense>
  )
}
