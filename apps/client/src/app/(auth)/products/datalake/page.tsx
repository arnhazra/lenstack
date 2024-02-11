"use client"
import { Fragment, useCallback, useContext, useState } from "react"
import { Badge, Button, Container, Row } from "react-bootstrap"
import Link from "next/link"
import { ArrowRightIcon, ArrowLeftIcon, ReaderIcon } from "@radix-ui/react-icons"
import Loading from "@/components/loading"
import Suspense from "@/components/suspense"
import useQuery from "@/hooks/use-query"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import Hero from "@/components/hero"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import { uiConstants } from "@/constants/global-constants"
import Error from "@/components/error"
import Option from "@/components/option"
import Grid from "@/components/grid"

export interface DatasetRequestState {
  selectedFilter: string
  selectedSortOption: string
  offset: number
}

export default function Page() {
  const [{ appState }] = useContext(GlobalContext)
  const [datasetRequestState, setDatasetRequestState] = useState<DatasetRequestState>({ selectedFilter: "All", selectedSortOption: "name", offset: 0 })
  const filters = useQuery(["filters"], endPoints.datalakeFilters, HTTPMethods.GET)
  const datasets = useQuery(["datasets"], endPoints.datalakeFindDatasets, HTTPMethods.POST, { searchQuery: appState.globalSearchString, selectedFilter: datasetRequestState.selectedFilter, selectedSortOption: datasetRequestState.selectedSortOption, offset: datasetRequestState.offset })
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=datalake`, HTTPMethods.GET)
  const selectedProduct = products?.data?.find((product: any) => product.productName === "datalake")
  const [sortOptions] = useState([
    { value: "name", label: "Name Ascending" },
    { value: "-name", label: "Name Descending" },
    { value: "-_id", label: "Freshness" },
    { value: "-rating", label: "More Popular" },
    { value: "rating", label: "Less Popular" }
  ])

  const prevPage = () => {
    const prevDatasetReqNumber = datasetRequestState.offset - 24
    setDatasetRequestState({ ...datasetRequestState, offset: prevDatasetReqNumber })
    window.scrollTo(0, 0)
  }

  const nextPage = () => {
    const nextOffset = datasetRequestState.offset + 24
    setDatasetRequestState({ ...datasetRequestState, offset: nextOffset })
    window.scrollTo(0, 0)
  }

  const renderDatasets = useCallback(() => {
    const datasetsToDisplay = datasets?.data?.datasets?.map((dataset: any) => {
      const cardProps: CardInterface = {
        badgeText: dataset.category,
        className: "centralized",
        headerText: dataset.name,
        footerText: `${dataset.description.slice(0, 110)}...`,
        redirectUri: `/products/datalake/dataset?datasetId=${dataset._id}`
      }

      return <Card key={dataset._id} cardProps={cardProps} />
    })

    return (
      <Suspense condition={!!datasets?.data?.datasets.length} fallback={<h4 className="text-white">No Datasets to display</h4>}>
        <h4 className="text-white">Explore the datasets</h4>
        <Grid>
          {datasetsToDisplay}
        </Grid>
      </Suspense>
    )
  }, [datasets?.data])

  const renderFilterCategories = useCallback(() => {
    const filterCategoriesToDisplay = filters?.data?.filterCategories?.map((category: string) => (
      <Option
        key={category}
        isSelected={datasetRequestState.selectedFilter === category}
        label={category}
        value={category}
        handleChange={(value) => setDatasetRequestState({ ...datasetRequestState, selectedFilter: value, offset: 0 })}
      />
    ))

    return (
      <Fragment>
        <p className="muted-text ps-2">Select Filter Category</p>
        <Row xl={5} lg={4} md={3} sm={2} xs={2}>
          {filterCategoriesToDisplay}
        </Row>
      </Fragment>
    )
  }, [filters?.data, datasetRequestState])

  const renderSortOptions = useCallback(() => {
    const sortOptionsToRender = sortOptions.map((option) => (
      <Option
        key={option.value}
        isSelected={datasetRequestState.selectedSortOption === option.value}
        label={option.label}
        value={option.value}
        handleChange={(value) => setDatasetRequestState({ ...datasetRequestState, selectedSortOption: value, offset: 0 })}
      />
    ))

    return (
      <Fragment>
        <p className="muted-text ps-2">Select Sort Option</p>
        <Row xl={5} lg={4} md={3} sm={2} xs={2}>
          {sortOptionsToRender}
        </Row>
      </Fragment>
    )
  }, [sortOptions, datasetRequestState])

  return (
    <Suspense condition={!datasets.isLoading && !filters.isLoading && !products.isLoading} fallback={<Loading />}>
      <Suspense condition={!datasets.error && !filters.error && !products.error} fallback={<Error />}>
        <Container>
          <Hero>
            <p className="branding">{uiConstants.brandName} {selectedProduct?.displayName}</p>
            <p className="muted-text mt-3">{selectedProduct?.largeDescription}</p>
            <div className="mb-2">
              <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productCategory}</Badge>
              <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productStatus}</Badge>
            </div>
            <Row className="g-2 mt-4">
              {renderFilterCategories()}
            </Row>
            <Row className="g-2 mt-3">
              {renderSortOptions()}
            </Row>
            <Link href={`/apireference?productName=${selectedProduct?.productName}`} className="btn btn-secondary mt-1 mb-2">
              <ReaderIcon className="icon-left" />API Reference
            </Link>
          </Hero>
          {renderDatasets()}
          <div className="text-center">
            {datasetRequestState.offset !== 0 && <Button variant="primary" onClick={prevPage}><ArrowLeftIcon className="icon-left" />Show Prev</Button>}
            {datasets?.data?.datasets?.length === 24 && <Button variant="primary" onClick={nextPage}>Show Next<ArrowRightIcon className="icon-right" /></Button>}
          </div>
        </Container>
      </Suspense>
    </Suspense>
  )
}
