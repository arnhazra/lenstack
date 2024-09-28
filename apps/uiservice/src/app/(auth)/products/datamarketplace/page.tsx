"use client"
import ErrorComponent from "@/components/error"
import LoadingComponent from "@/components/loading"
import Suspense from "@/components/suspense"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Box, ChevronLeft, ChevronRight, ListFilter, Medal, ShieldCheck, SortAsc, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { uiConstants } from "@/constants/global-constants"

export interface DatasetRequestState {
  searchQuery: string
  selectedFilter: string
  selectedSortOption: string
  offset: number
}

export default function Page() {
  const router = useRouter()
  const [datasetRequestState, setDatasetRequestState] = useState<DatasetRequestState>({ searchQuery: "", selectedFilter: "All", selectedSortOption: "name", offset: 0 })
  const filtersAndSortOptions = useQuery(["filters-and-sorts"], endPoints.datamarketplaceFilterAndSortOptions, HTTPMethods.GET)
  const datasets = useQuery(["datasets", datasetRequestState.selectedFilter, datasetRequestState.selectedSortOption, String(datasetRequestState.offset)], endPoints.datamarketplaceFindDatasets, HTTPMethods.POST, datasetRequestState)
  useEffect(() => { if (!datasetRequestState.searchQuery) datasets.refetch() }, [datasetRequestState.searchQuery])

  const renderFilterTabs = filtersAndSortOptions?.data?.filters?.map((item: string) => {
    return (
      <div
        key={item}
        className={`cursor-pointer flex capitalize ${datasetRequestState.selectedFilter === item ? "" : "text-zinc-500"}`}
        onClick={(): void => setDatasetRequestState({ ...datasetRequestState, selectedFilter: item, offset: 0, searchQuery: "" })}
      >
        <Box className="scale-75 me-2" />
        <p>{item}</p>
      </div>
    )
  })

  const renderSortOptions = filtersAndSortOptions?.data?.sortOptions?.map((item: any) => {
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
      <TableRow className="cursor-pointer" key={dataset?._id} onClick={(): void => router.push(`/products/datamarketplace/dataset/${dataset._id}`)}>
        <TableCell><div className="font-medium">{dataset?.name}</div></TableCell>
        <TableCell className="text-zinc-500">{dataset?.category}</TableCell>
        <TableCell className="hidden md:table-cell">{dataset?.rating}</TableCell>
        <TableCell className="hidden md:table-cell">
          <Suspense condition={dataset?.rating >= 4.5} fallback={null}>
            <Badge variant="default" key={"gold"}><Medal className="scale-50" />Gold</Badge>
          </Suspense>
          <Suspense condition={dataset?.rating >= 4.0 && dataset?.rating < 4.5} fallback={null}>
            <Badge variant="secondary" key={"silver"}><Medal className="scale-50" />Silver</Badge>
          </Suspense>
          <Suspense condition={dataset?.rating < 4.0} fallback={null}>
            <Badge variant="outline" key={"bronze"}><Medal className="scale-50" />Bronze</Badge >
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
    <Suspense condition={!datasets.isLoading} fallback={<LoadingComponent />}>
      <Suspense condition={!datasets.error} fallback={<ErrorComponent />}>
        <div className="flex min-h-screen w-full flex-col -mt-4">
          <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
            <div className="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
              <nav className="grid gap-4 text-sm">
                {renderFilterTabs}
              </nav>
              <div>
                <div className="w-full">
                  <form onSubmit={(e) => { e.preventDefault(); datasets.refetch() }}>
                    <div className="relative">
                      <Sparkles className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                      <Input
                        defaultValue={datasetRequestState.searchQuery}
                        onChange={(e): void => setDatasetRequestState({ ...datasetRequestState, searchQuery: e.target.value })}
                        type="search"
                        placeholder="Type anything and press enter to find datasets powered by AI"
                        className="mb-4 pl-8 w-full h-12 focus:outline-none"
                      />
                      <p className="text-xs text-zinc-500 -mt-2 mb-4 ms-1">{uiConstants.aiSafetyStatement}</p>
                    </div>
                  </form>
                </div>
                <section className="grid gap-6">
                  <Card className="xl:col-span-2">
                    <CardHeader className="px-7">
                      <div className="flex justify-between">
                        <div>
                          <CardTitle>Datasets</CardTitle>
                          <p className="text-sm text-zinc-600 mt-1">Explore datasets from different categories</p>
                        </div>
                        <div>
                          <Suspense condition={!datasetRequestState.searchQuery} fallback={null}>
                            <div className="ml-auto flex items-center gap-2">
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
                          </Suspense>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>

                      <Suspense condition={!datasets.isRefetching} fallback={<p className="text-center">Finding the best datasets for you</p>}>
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
                      </Suspense>
                    </CardContent>
                    <CardFooter>
                      <Suspense condition={!datasetRequestState.searchQuery} fallback={null}>
                        <Button disabled={datasetRequestState.offset === 0} variant="outline" onClick={prevPage} size="icon" className="me-2"><ChevronLeft className="scale-75" /></Button>
                        <Button disabled={datasets?.data?.length !== 25} variant="outline" onClick={nextPage} size="icon"><ChevronRight className="scale-75" /></Button>
                      </Suspense>
                    </CardFooter>
                  </Card>
                </section>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </Suspense>
  )
}
