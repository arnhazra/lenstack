"use client"
import { ChangeEvent, useMemo, useState } from "react"
import { Badge, Button, Col, Container, Form, Row } from "react-bootstrap"
import { ArrowRightIcon, ArrowLeftIcon } from "@radix-ui/react-icons"
import { Fragment } from "react"
import debounce from "lodash.debounce"
import Loading from "@/_components/Loading"
import Show from "@/_components/Show"
import useFetch from "@/_hooks/useFetch"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import { DatasetRequestState, GenericAppCardInterface } from "@/_types/Types"
import GenericAppCard from "@/_components/GenericAppCard"
import GenericHero from "@/_components/GenericHero"

export default function Page() {
  const [datasetRequestState, setDatasetRequestState] = useState<DatasetRequestState>({ searchQuery: "", selectedFilter: "All", selectedSortOption: "name", offset: 0 })
  const filters = useFetch("filters", endPoints.airlakeFiltersEndpoint, HTTPMethods.POST)
  const dataLibrary = useFetch("find datasets", endPoints.airlakeFindDatasetsEndpoint, HTTPMethods.POST, datasetRequestState)
  const apps = useFetch("get-apps", endPoints.getPlatformConfigEndpoint, HTTPMethods.POST)

  const selectedApp = apps?.data?.find((app: any) => {
    return app.appName === "airlake"
  })

  const filterCategoriesToDisplay = filters?.data?.filterCategories?.map((category: string) => {
    return <option className="options" key={category} value={category}>{category}</option>
  })

  const datasetsToDisplay = dataLibrary?.data?.datasets?.map((dataset: any) => {
    const genericAppCardProps: GenericAppCardInterface = {
      badgeText: dataset.category,
      className: "centralized",
      headerText: dataset.name,
      footerText: `${dataset.description.slice(0, 110)}...`,
      redirectUri: `/apps/centralized/airlake/dataset?datasetId=${dataset._id}`
    }
    return <GenericAppCard key={dataset._id} genericAppCardProps={genericAppCardProps} />
  })

  const noDatasetsToDisplay = <h4 className="text-white">No Results</h4>

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

  const searchChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setDatasetRequestState({ ...datasetRequestState, searchQuery: event.target.value, offset: 0 })
  }

  const debouncedChangeHandler = useMemo(() => debounce(searchChangeHandler, 1000), [])

  return (
    <Fragment>
      <Show when={!dataLibrary.isLoading && !filters.isLoading}>
        <Container>
          <GenericHero>
            <p className="branding">{selectedApp?.appName}</p>
            <p className="muted-text mt-3">{selectedApp?.description}</p>
            <div className="mb-2">
              <Badge pill bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedApp?.appCategory}</Badge>
              <Badge pill bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2">{selectedApp?.appStatus}</Badge>
            </div>
            <Row className="g-2">
              <Col xs={12} sm={12} md={6} lg={4} xl={6}>
                <Form.Group controlId="floatingSearch">
                  <Form.Label>Search for Datasets</Form.Label>
                  <Form.Control size="lg" type="Search" defaultValue={datasetRequestState.searchQuery} onChange={debouncedChangeHandler} placeholder="Search for Datasets" required autoComplete={"off"} minLength={4} maxLength={40} />
                </Form.Group>
              </Col>
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
          <Row className="mt-4 mb-2">
            {dataLibrary?.data?.datasets?.length ? datasetsToDisplay : noDatasetsToDisplay}
          </Row>
          <div className="text-center">
            {datasetRequestState.offset !== 0 && <Button className="btn" onClick={prevPage}><ArrowLeftIcon className="icon-left" />Show Prev</Button>}
            {dataLibrary?.data?.datasets?.length === 36 && <Button className="btn" onClick={nextPage}>Show Next<ArrowRightIcon className="icon-right" /></Button>}
          </div>
        </Container>
      </Show>
      <Show when={dataLibrary.isLoading || filters.isLoading}>
        <Loading />
      </Show>
    </Fragment >
  )
}
