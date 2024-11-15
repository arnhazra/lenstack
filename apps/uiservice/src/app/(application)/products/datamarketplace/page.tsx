"use client"
import ErrorComponent from "@/shared/components/error"
import LoadingComponent from "@/shared/components/loading"
import Suspense from "@/shared/components/suspense"
import { Button } from "@/shared/components/ui/button"
import { endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import useQuery from "@/shared/hooks/use-query"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import {
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  SortAsc,
  Sparkles,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/shared/components/ui/input"
import { uiConstants } from "@/shared/constants/global-constants"
import { DatasetCard } from "./(components)/dataset-card"

export interface DatasetRequestState {
  searchQuery: string
  selectedFilter: string
  selectedSortOption: string
  offset: number
}

export default function Page() {
  const router = useRouter()
  const [datasetRequestState, setDatasetRequestState] =
    useState<DatasetRequestState>({
      searchQuery: "",
      selectedFilter: "All",
      selectedSortOption: "name",
      offset: 0,
    })
  const filtersAndSortOptions = useQuery(
    ["filters-and-sorts"],
    endPoints.datamarketplaceFilterAndSortOptions,
    HTTPMethods.GET
  )
  const datasets = useQuery(
    [
      "datasets",
      datasetRequestState.selectedFilter,
      datasetRequestState.selectedSortOption,
      String(datasetRequestState.offset),
    ],
    endPoints.datamarketplaceFindDatasets,
    HTTPMethods.POST,
    datasetRequestState
  )

  useEffect(() => {
    if (!datasetRequestState.searchQuery) datasets.refetch()
  }, [datasetRequestState.searchQuery])

  const renderFilterTabs = filtersAndSortOptions?.data?.filters?.map(
    (item: string) => {
      return (
        <div
          key={item}
          className={`cursor-pointer flex capitalize ${
            datasetRequestState.selectedFilter === item ? "" : "text-slate-500"
          }`}
          onClick={(): void =>
            setDatasetRequestState({
              ...datasetRequestState,
              selectedFilter: item,
              offset: 0,
              searchQuery: "",
            })
          }
        >
          <SlidersHorizontal className="scale-75 me-2" />
          <p>{item}</p>
        </div>
      )
    }
  )

  const renderSortOptions = filtersAndSortOptions?.data?.sortOptions?.map(
    (item: any) => {
      return (
        <DropdownMenuCheckboxItem
          key={item.value}
          checked={datasetRequestState.selectedSortOption === item.value}
          onClick={(): void =>
            setDatasetRequestState({
              ...datasetRequestState,
              selectedSortOption: item.value,
              offset: 0,
            })
          }
        >
          {item.label}
        </DropdownMenuCheckboxItem>
      )
    }
  )

  const dataQuality = (rating: number): string => {
    if (rating > 4.5) return "Gold"
    if (rating > 4.0) return "Silver"
    return "Bronze"
  }

  const renderDatasets = datasets?.data?.map((dataset: any) => {
    return (
      <DatasetCard
        key={dataset?._id}
        id={dataset?._id}
        title={dataset?.name}
        desc={dataset?.description}
        category={dataset?.category}
        rating={dataset?.rating}
        quality={dataQuality(dataset?.rating)}
        handleClick={(id: string) =>
          router.push(`/products/datamarketplace/dataset/${id}`)
        }
      />
    )
  })

  const prevPage = () => {
    const prevDatasetReqNumber = datasetRequestState.offset - 30
    setDatasetRequestState({
      ...datasetRequestState,
      offset: prevDatasetReqNumber,
    })
    window.scrollTo(0, 0)
  }

  const nextPage = () => {
    const nextOffset = datasetRequestState.offset + 30
    setDatasetRequestState({ ...datasetRequestState, offset: nextOffset })
    window.scrollTo(0, 0)
  }

  return (
    <Suspense
      condition={!datasets.isLoading && !filtersAndSortOptions.isLoading}
      fallback={<LoadingComponent />}
    >
      <Suspense
        condition={!datasets.error && !filtersAndSortOptions.error}
        fallback={<ErrorComponent />}
      >
        <div className="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm">{renderFilterTabs}</nav>
          <div>
            <div className="w-full">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  datasets.refetch()
                }}
              >
                <div className="relative">
                  <Sparkles className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                  <Input
                    defaultValue={datasetRequestState.searchQuery}
                    onChange={(e): void =>
                      setDatasetRequestState({
                        ...datasetRequestState,
                        searchQuery: e.target.value,
                      })
                    }
                    type="search"
                    placeholder="Type anything and press enter to find datasets"
                    className="mb-4 pl-8 w-full h-12 focus:outline-none"
                  />
                  <p className="text-xs text-slate-500 -mt-2 mb-4 ms-1">
                    {uiConstants.aiSafetyStatement}
                  </p>
                </div>
              </form>
            </div>
            <section className="grid gap-6 mb-4">
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <SortAsc className="h-3.5 w-3.5" />
                      <span>Sort</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Sort</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {renderSortOptions}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mx-auto grid justify-center gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                {renderDatasets}
              </div>
            </section>
            <Suspense condition={!datasetRequestState.searchQuery}>
              <Button
                disabled={datasetRequestState.offset === 0}
                variant="outline"
                onClick={prevPage}
                size="icon"
                className="me-2"
              >
                <ChevronLeft className="scale-75" />
              </Button>
              <Button
                disabled={datasets?.data?.length !== 30}
                variant="outline"
                onClick={nextPage}
                size="icon"
              >
                <ChevronRight className="scale-75" />
              </Button>
            </Suspense>
          </div>
        </div>
      </Suspense>
    </Suspense>
  )
}
