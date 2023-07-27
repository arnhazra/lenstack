"use client"
import { ChangeEvent, useContext, useMemo } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { Fragment } from "react"
import debounce from "lodash.debounce"
import Loading from "@/components/Loading"
import Show from "@/components/Show"
import { AppContext } from "@/context/appStateProvider"
import DatasetCard from "@/components/DatasetCard"
import useFetch from "@/hooks/useFetch"
import endPoints from "@/constants/apiEndpoints"
import HTTPMethods from "@/constants/httpMethods"
import Error from "@/components/ErrorComp"
import withAuth from "@/utils/withAuth"
import { NextPage } from "next"
import { ArrowRightIcon, ArrowLeftIcon } from "@radix-ui/react-icons"

const AirlakeDatasetsPage: NextPage = () => {
    const [{ datasetRequestState }, dispatch] = useContext(AppContext)
    const filters = useFetch("filters", endPoints.airlakeFiltersEndpoint, HTTPMethods.POST)
    const dataLibrary = useFetch("data platform", endPoints.airlakeFindDatasetsEndpoint, HTTPMethods.POST, datasetRequestState)

    const filterCategoriesToDisplay = filters?.data?.filterCategories?.map((category: string) => {
        return <option className="options" key={category} value={category}>{category}</option>
    })

    const datasetsToDisplay = dataLibrary?.data?.datasets?.map((dataset: any) => {
        return <DatasetCard key={dataset._id} id={dataset._id} category={dataset.category} name={dataset.name} rating={dataset.rating} />
    })

    const noDatasetsToDisplay = <Error customMessage="No Datasets" />

    const prevPage = () => {
        const prevDatasetReqNumber = datasetRequestState.offset - 36
        dispatch("setDatasetRequestState", { offset: prevDatasetReqNumber })
        window.scrollTo(0, 0)
    }

    const nextPage = () => {
        const nextOffset = datasetRequestState.offset + 36
        dispatch("setDatasetRequestState", { offset: nextOffset })
        window.scrollTo(0, 0)
    }

    const searchChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch("setDatasetRequestState", { searchQuery: event.target.value, offset: 0 })
    }

    const debouncedChangeHandler = useMemo(() => debounce(searchChangeHandler, 1000), [])

    return (
        <Fragment>
            <Show when={!dataLibrary.isLoading && !filters.isLoading}>
                <Container>
                    <div className="jumbotron p-4">
                        <Row className="g-2">
                            <Col xs={12} sm={12} md={6} lg={4} xl={6}>
                                <Form.Group controlId="floatingSearch">
                                    <Form.Label>What are you looking for?</Form.Label>
                                    <Form.Control size="lg" type="Search" defaultValue={datasetRequestState.searchQuery} onChange={debouncedChangeHandler} placeholder="What are you looking for today?" required autoComplete={"off"} minLength={4} maxLength={40} />
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={4} xl={3}>
                                <Form.Group controlId="floatingSelectGrid">
                                    <Form.Label>Select Filter Category</Form.Label>
                                    <Form.Select size="lg" defaultValue={datasetRequestState.selectedFilter} onChange={(e): void => dispatch("setDatasetRequestState", { selectedFilter: e.target.value, offset: 0 })}>
                                        {filterCategoriesToDisplay}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={4} xl={3}>
                                <Form.Group controlId="floatingSelectGrid">
                                    <Form.Label>Sort By</Form.Label>
                                    <Form.Select size="lg" defaultValue={datasetRequestState.selectedSortOption} onChange={(e): void => dispatch("setDatasetRequestState", { selectedSortOption: e.target.value })}>
                                        <option className="options" key={"nameAscending"} value={"name"}>Name Ascending</option>
                                        <option className="options" key={"nameDescending"} value={"-name"}>Name Descending</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>

                    <Row className="mt-4 mb-4">
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

export default withAuth(AirlakeDatasetsPage)