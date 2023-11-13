"use client"
import { useCallback, useContext, useState } from "react"
import { Badge, Button, Col, Container, Form, Row } from "react-bootstrap"
import { ArrowRightIcon, ArrowLeftIcon } from "@radix-ui/react-icons"
import { Fragment } from "react"
import Loading from "@/components/Loading"
import Show from "@/components/Show"
import useFetch from "@/hooks/useFetch"
import endPoints from "@/constants/apiEndpoints"
import HTTPMethods from "@/constants/httpMethods"
import { DatasetRequestState, GenericProductCardInterface } from "@/types/Types"
import GenericProductCard from "@/components/GenericProductCard"
import GenericHero from "@/components/GenericHero"
import { GlobalContext } from "@/context/globalStateProvider"

export default function Page() {
  const [{ globalSearchString }] = useContext(GlobalContext)
  const [datasetRequestState, setDatasetRequestState] = useState<DatasetRequestState>({ selectedFilter: "All", selectedSortOption: "name", offset: 0 })
  const filters = useFetch("filters", endPoints.airlakeFiltersEndpoint, HTTPMethods.POST)
  const datasets = useFetch("find datasets", endPoints.airlakeFindDatasetsEndpoint, HTTPMethods.POST, { searchQuery: globalSearchString, selectedFilter: datasetRequestState.selectedFilter, selectedSortOption: datasetRequestState.selectedSortOption, offset: datasetRequestState.offset })
  const products = useFetch("get-products", endPoints.getProductConfigEndpoint, HTTPMethods.POST, { searchQuery: "airlake" })
  const selectedProduct = products?.data?.find((product: any) => product.productName === "airlake")

  const displayDatasets = useCallback(() => {
    const datasetsToDisplay = datasets?.data?.datasets?.map((dataset: any) => {
      const genericProductCardProps: GenericProductCardInterface = {
        badgeText: dataset.category,
        className: "centralized",
        headerText: dataset.name,
        footerText: `${dataset.description.slice(0, 110)}...`,
        redirectUri: `/products/airlake/dataset?datasetId=${dataset._id}`
      }
      return <GenericProductCard key={dataset._id} genericProductCardProps={genericProductCardProps} />
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
          <GenericHero>
            <p className="branding">{selectedProduct?.productName}</p>
            <p className="muted-text mt-3">{selectedProduct?.largeDescription}</p>
            <div className="mb-2">
              <Badge bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productCategory}</Badge>
              <Badge bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedProduct?.productStatus}</Badge>
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
          </GenericHero>
          {displayDatasets()}
          <div className="text-center">
            {datasetRequestState.offset !== 0 && <Button className="btn" onClick={prevPage}><ArrowLeftIcon className="icon-left" />Show Prev</Button>}
            {datasets?.data?.datasets?.length === 36 && <Button className="btn" onClick={nextPage}>Show Next<ArrowRightIcon className="icon-right" /></Button>}
          </div>
        </Container>
      </Show>
      <Show when={datasets.isLoading || filters.isLoading || products.isLoading}>
        <Loading />
      </Show>
    </Fragment >
  )
}
