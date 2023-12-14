"use client"
import { useCallback, useContext, useState } from "react"
import { Badge, Button, Col, Container, Form, Row } from "react-bootstrap"
import Link from "next/link"
import { ArrowRightIcon, ArrowLeftIcon, ReaderIcon } from "@radix-ui/react-icons"
import { Fragment } from "react"
import Loading from "@/components/loading-component"
import Show from "@/components/show-component"
import useFetch from "@/hooks/use-fetch"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import { DatasetRequestState, ProductCardInterface } from "@/types/Types"
import ProductCard from "@/components/productcard-component"
import Hero from "@/components/hero-component"
import { GlobalContext } from "@/context/globalstate.provider"
import { uiConstants } from "@/constants/global-constants"

export default function Page() {
  const [{ globalSearchString }] = useContext(GlobalContext)
  const [datasetRequestState, setDatasetRequestState] = useState<DatasetRequestState>({ selectedFilter: "All", selectedSortOption: "name", offset: 0 })
  const filters = useFetch("filters", endPoints.datalakeFilters, HTTPMethods.POST)
  const datasets = useFetch("find datasets", endPoints.datalakeFindDatasets, HTTPMethods.POST, { searchQuery: globalSearchString, selectedFilter: datasetRequestState.selectedFilter, selectedSortOption: datasetRequestState.selectedSortOption, offset: datasetRequestState.offset })
  const products = useFetch("get-products", endPoints.getProductConfig, HTTPMethods.POST, { searchQuery: "datalake" })
  const selectedProduct = products?.data?.find((product: any) => product.productName === "datalake")

  const displayDatasets = useCallback(() => {
    const datasetsToDisplay = datasets?.data?.datasets?.map((dataset: any) => {
      const productCardProps: ProductCardInterface = {
        badgeText: dataset.category,
        className: "centralized",
        headerText: dataset.name,
        footerText: `${dataset.description.slice(0, 110)}...`,
        redirectUri: `/products/datalake/dataset?datasetId=${dataset._id}`
      }
      return <ProductCard key={dataset._id} productCardProps={productCardProps} />
    })

    return (
      <Row className="mt-2 mb-2">
        <Show when={!!datasets?.data?.datasets.length}>
          <h4 className="text-white">Datasets</h4>
          {datasetsToDisplay}
        </Show>
        <Show when={!datasets?.data?.datasets.length}>
          <h4 className="text-white">No Datasets to display</h4>
        </Show>
      </Row>
    )
  }, [datasets?.data])

  const filterCategoriesToDisplay = filters?.data?.filterCategories?.map((category: string) => {
    return <option className="options" key={category} value={category}>{category}</option>
  })

  const prevPage = () => {
    const prevDatasetReqNumber = datasetRequestState.offset - 36
    setDatasetRequestState({ ...datasetRequestState, offset: prevDatasetReqNumber })
    window.scrollTo(0, 0)
  }

  const nextPage = () => {
    const nextOffset = datasetRequestState.offset + 36
    setDatasetRequestState({ ...datasetRequestState, offset: nextOffset })
    window.scrollTo(0, 0)
  }

  return (
    <Fragment>
      <Show when={!datasets.isLoading && !filters.isLoading && !products.isLoading}>
        <Container>
          <Hero>
            <p className="branding">{uiConstants.brandName} {selectedProduct?.displayName}</p>
            <p className="muted-text mt-3">{selectedProduct?.largeDescription}</p>
            <div className="mb-2">
              <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productCategory}</Badge>
              <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productStatus}</Badge>
            </div>
            <Row className="g-2">
              <Col xs={12} sm={12} md={6} lg={4} xl={3}>
                <Form.Group controlId="floatingSelectGrid">
                  <Form.Label>Select Filter Category</Form.Label>
                  <Form.Select size="lg" defaultValue={datasetRequestState.selectedFilter} onChange={(e): void => setDatasetRequestState({ ...datasetRequestState, selectedFilter: e.target.value, offset: 0 })}>
                    {filterCategoriesToDisplay}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={4} xl={3}>
                <Form.Group controlId="floatingSelectGrid">
                  <Form.Label>Sort By</Form.Label>
                  <Form.Select size="lg" defaultValue={datasetRequestState.selectedSortOption} onChange={(e): void => setDatasetRequestState({ ...datasetRequestState, selectedSortOption: e.target.value })}>
                    <option className="options" key={"nameAscending"} value={"name"}>Name Ascending</option>
                    <option className="options" key={"nameDescending"} value={"-name"}>Name Descending</option>
                    <option className="options" key={"freshness"} value={"-_id"}>Freshness</option>
                    <option className="options" key={"popularityRatingAscending"} value={"-rating"}>More Popular</option>
                    <option className="options" key={"popularityRatingDescending"} value={"rating"}>Less Popular</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Link href={`/apireference?productName=${selectedProduct?.productName}`} className="btn btn-primary mt-2 mb-2">
              <ReaderIcon className="icon-left" />API Reference
            </Link>
          </Hero>
          {displayDatasets()}
          <div className="text-center">
            {datasetRequestState.offset !== 0 && <Button variant="primary" onClick={prevPage}><ArrowLeftIcon className="icon-left" />Show Prev</Button>}
            {datasets?.data?.datasets?.length === 36 && <Button variant="primary" onClick={nextPage}>Show Next<ArrowRightIcon className="icon-right" /></Button>}
          </div>
        </Container>
      </Show>
      <Show when={datasets.isLoading || filters.isLoading || products.isLoading}>
        <Loading />
      </Show>
    </Fragment>
  )
}
