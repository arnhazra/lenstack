"use client"
import ErrorComponent from "@/components/error"
import LoadingComponent from "@/components/loading"
import Suspense from "@/components/suspense"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { endPoints } from "@/constants/api-endpoints"
import { uiConstants } from "@/constants/global-constants"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronLeft, ChevronRight, ListFilter, Medal, ShieldCheck, SortAsc } from "lucide-react"
import { useContext, useState } from "react"
import { sortOptions } from "./data"
import { useRouter } from "next/navigation"
import { GlobalContext } from "@/context/providers/globalstate.provider"

export interface DatasetRequestState {
  selectedFilter: string
  selectedSortOption: string
  offset: number
}

export default function Page() {
  const router = useRouter()
  const [{ userState }] = useContext(GlobalContext)
  const [datasetRequestState, setDatasetRequestState] = useState<DatasetRequestState>({ selectedFilter: "All", selectedSortOption: "name", offset: 0 })
  const filters = useQuery(["filters"], endPoints.datamarketplaceFilters, HTTPMethods.GET)
  const datasets = useQuery(["datasets"], endPoints.datamarketplaceFindDatasets, HTTPMethods.POST, { searchQuery: userState.searchQuery, selectedFilter: datasetRequestState.selectedFilter, selectedSortOption: datasetRequestState.selectedSortOption, offset: datasetRequestState.offset })
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=datamarketplace&category=All`, HTTPMethods.GET)
  const selectedProduct = products?.data?.find((product: any) => product.productName === "datamarketplace")

  const renderFilterOptions = filters?.data?.map((item: string) => {
    return (
      <DropdownMenuCheckboxItem
        key={item}
        checked={datasetRequestState.selectedFilter === item}
        onClick={(): void => setDatasetRequestState({ ...datasetRequestState, selectedFilter: item, offset: 0 })}
      >
        {item}
      </DropdownMenuCheckboxItem>
    )
  })

  const renderSortOptions = sortOptions.map((item) => {
    return (
      <DropdownMenuCheckboxItem
        key={item.value}
        checked={datasetRequestState.selectedSortOption === item.value}
        onClick={(): void => setDatasetRequestState({ ...datasetRequestState, selectedSortOption: item.value, offset: 0 })}
      >
        {item.label}
      </DropdownMenuCheckboxItem>
    )
  })

  const renderDatasets = datasets?.data?.map((dataset: any) => {
    return (
      <TableRow className="cursor-pointer" key={dataset?._id} onClick={(): void => router.push(`/products/datamarketplace/dataset?datasetId=${dataset._id}`)}>
        <TableCell><div className="font-medium">{dataset?.name}</div></TableCell>
        <TableCell className="text-neutral-500">{dataset?.category}</TableCell>
        <TableCell className="hidden md:table-cell">{dataset?.rating}</TableCell>
        <TableCell className="hidden md:table-cell">
          <Suspense condition={dataset?.rating >= 4.5} fallback={null}>
            <Badge className="gold-badge" key={"gold"}><Medal className="scale-50" />Gold</Badge>
          </Suspense>
          <Suspense condition={dataset?.rating >= 4.0 && dataset?.rating < 4.5} fallback={null}>
            <Badge className="silver-badge" key={"silver"}><Medal className="scale-50" />Silver</Badge>
          </Suspense>
          <Suspense condition={dataset?.rating < 4.0} fallback={null}>
            <Badge className="bronze-badge" key={"bronze"}><Medal className="scale-50" />Bronze</Badge >
          </Suspense>
        </TableCell>
        <TableCell className="text-right hidden md:table-cell">
          <Suspense condition={dataset?.rating >= 4.2} fallback={null}>
            <Badge variant="default" key={"gold"}><ShieldCheck className="scale-50" />Level 3</Badge>
          </Suspense>
          <Suspense condition={dataset?.rating >= 3.6 && dataset?.rating < 4.2} fallback={null}>
            <Badge variant="secondary" key={"silver"}><ShieldCheck className="scale-50" />Level 2</Badge>
          </Suspense>
          <Suspense condition={dataset?.rating < 3.6} fallback={null}>
            <Badge variant="outline" key={"bronze"}><ShieldCheck className="scale-50" />Level 1</Badge >
          </Suspense>
        </TableCell>
      </TableRow>
    )
  })

  const prevPage = () => {
    const prevDatasetReqNumber = datasetRequestState.offset - 25
    setDatasetRequestState({ ...datasetRequestState, offset: prevDatasetReqNumber })
    window.scrollTo(0, 0)
  }

  const nextPage = () => {
    const nextOffset = datasetRequestState.offset + 25
    setDatasetRequestState({ ...datasetRequestState, offset: nextOffset })
    window.scrollTo(0, 0)
  }

  return (
    <Suspense condition={!datasets.isLoading && !products.isLoading} fallback={<LoadingComponent />}>
      <Suspense condition={!datasets.error && !products.error} fallback={<ErrorComponent />}>
        <div className="flex min-h-screen w-full flex-col">
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card className="sm:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle>{uiConstants.brandName} {selectedProduct?.displayName}</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    {selectedProduct?.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button onClick={(): void => router.push(`/apireference?tab=dataMarketplace`)}>API Reference</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Datasets Count</CardDescription>
                  <CardTitle className="text-4xl">{datasets?.data?.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Total number of dataset
                    results shown
                  </div>
                </CardContent>
                <CardFooter>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Dataset Categories</CardDescription>
                  <CardTitle className="text-4xl">{filters?.data?.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Number of dataset categories
                  </div>
                </CardContent>
                <CardFooter>
                </CardFooter>
              </Card>
            </div>
            <Card className="xl:col-span-2">
              <CardHeader className="px-7">
                <CardTitle>Datasets</CardTitle>
                <CardDescription>
                  Explore datasets from different categories
                </CardDescription>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
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
                      {renderFilterOptions}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <SortAsc className="h-3.5 w-3.5" />
                        <span>
                          Sort
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Sort</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {renderSortOptions}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <Suspense condition={datasets?.data?.length > 0} fallback={<p className="text-center">No datasets to display</p>}>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Dataset Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="hidden md:table-cell">Dataset Rating</TableHead>
                        <TableHead className="hidden md:table-cell">Data Quality</TableHead>
                        <TableHead className="text-right hidden md:table-cell">Data Maturity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {renderDatasets}
                    </TableBody>
                  </Table>
                </Suspense>
              </CardContent>
              <CardFooter>
                <Button disabled={datasetRequestState.offset === 0} variant="outline" onClick={prevPage} size="icon" className="me-2"><ChevronLeft className="scale-75" /></Button>
                <Button disabled={datasets?.data?.length !== 25} variant="outline" onClick={nextPage} size="icon"><ChevronRight className="scale-75" /></Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </Suspense >
    </Suspense >
  )
}
