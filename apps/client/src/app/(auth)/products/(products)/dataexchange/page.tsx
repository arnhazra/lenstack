"use client"
import { Fragment, useContext, useState } from "react"
import { Badge, Button, Col, Container, Row } from "react-bootstrap"
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
import { GenericCard, GenericCardProps } from "@/components/card"

export interface DatasetRequestState {
  selectedFilter: string
  selectedSortOption: string
  offset: number
}

export default function Page() {
  const [{ appState }] = useContext(GlobalContext)
  const [datasetRequestState, setDatasetRequestState] = useState<DatasetRequestState>({ selectedFilter: "All", selectedSortOption: "name", offset: 0 })
  const filters = useQuery(["filters"], endPoints.dataexchangeFilters, HTTPMethods.GET)
  const datasets = useQuery(["datasets"], endPoints.dataexchangeFindDatasets, HTTPMethods.POST, { searchQuery: appState.globalSearchString, selectedFilter: datasetRequestState.selectedFilter, selectedSortOption: datasetRequestState.selectedSortOption, offset: datasetRequestState.offset })
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=dataexchange`, HTTPMethods.GET)
  const selectedProduct = products?.data?.find((product: any) => product.productName === "dataexchange")
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

  const renderDatasets = datasets?.data?.datasets?.map((dataset: any) => {
    const datasetCardProps: GenericCardProps = {
      header: dataset.name,
      footer: <Fragment>
        <Badge color="white" bg="light" pill className="ps-3 pe-3 p-2 ps-3 pe-3 p-2 align-self-start mb-4">{dataset.category}</Badge>
        <p className="text-muted">{dataset.description.slice(0, 150)}...</p>
      </Fragment>
    }

    return (
      <Col key={dataset._id} className="mb-3">
        <Link href={`/products/dataexchange/dataset?datasetId=${dataset._id}`}>
          <GenericCard {...datasetCardProps} />
        </Link>
      </Col>
    )
  })

  const renderFilterCategories = filters?.data?.filterCategories?.map((category: string) => (
    <Option
      key={category}
      isSelected={datasetRequestState.selectedFilter === category}
      label={category}
      value={category}
      handleChange={(value) => setDatasetRequestState({ ...datasetRequestState, selectedFilter: value, offset: 0 })}
    />
  ))

  const renderSortOptions = sortOptions.map((option) => (
    <Option
      key={option.value}
      isSelected={datasetRequestState.selectedSortOption === option.value}
      label={option.label}
      value={option.value}
      handleChange={(value) => setDatasetRequestState({ ...datasetRequestState, selectedSortOption: value, offset: 0 })}
    />
  ))

  return (
    <Suspense condition={!filters.isLoading && !products.isLoading} fallback={<Loading />}>
      <Suspense condition={!datasets.error && !filters.error && !products.error} fallback={<Error />}>
        <Container>
          <Hero>
            <p className="branding">{uiConstants.brandName} {selectedProduct?.displayName}</p>
            <p className="text-muted mt-3">{selectedProduct?.largeDescription}</p>
            <div className="mb-2">
              <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productCategory}</Badge>
              <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productStatus}</Badge>
            </div>
            <Row className="g-2 mt-4">
              <Fragment>
                <p className="text-muted ps-2">Select Filter Category</p>
                <Row xl={5} lg={4} md={3} sm={2} xs={2}>
                  {renderFilterCategories}
                </Row>
              </Fragment>
            </Row>
            <Row className="g-2 mt-3">
              <Fragment>
                <p className="text-muted ps-2">Select Sort Option</p>
                <Row xl={5} lg={4} md={3} sm={2} xs={2}>
                  {renderSortOptions}
                </Row>
              </Fragment>
            </Row>
            <Link href={`/apireference?productName=${selectedProduct?.productName}`} className="btn btn-secondary mt-1 mb-2">
              <ReaderIcon className="icon-left" />API Reference
            </Link>
          </Hero>
          <Suspense condition={!datasets?.isLoading} fallback={<h4 className="text-white">Loading Datasets</h4>}>
            <Suspense condition={!!datasets?.data?.datasets.length} fallback={<h4 className="text-white">No Datasets to display</h4>}>
              <h4 className="text-white">Explore the datasets</h4>
              <Grid>
                {renderDatasets}
              </Grid>
            </Suspense>
          </Suspense>
          <div className="text-center">
            {datasetRequestState.offset !== 0 && <Button variant="primary" onClick={prevPage}><ArrowLeftIcon className="icon-left" />Show Prev</Button>}
            {datasets?.data?.datasets?.length === 24 && <Button variant="primary" onClick={nextPage}>Show Next<ArrowRightIcon className="icon-right" /></Button>}
          </div>
        </Container>
      </Suspense>
    </Suspense>
  )
}
