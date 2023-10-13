"use client"
import { useContext } from "react"
import { Badge, Button, Col, Container, Row } from "react-bootstrap"
import { Fragment } from "react"
import Loading from "@/_components/Loading"
import Show from "@/_components/Show"
import endPoints from "@/_constants/apiEndpoints"
import { toast } from "sonner"
import DatasetCard from "@/_components/DatasetCard"
import useFetch from "@/_hooks/useFetch"
import HTTPMethods from "@/_constants/httpMethods"
import Error from "@/_components/ErrorComp"
import { AppContext } from "@/_context/appStateProvider"
import appConstants from "@/_constants/appConstants"
import { useSearchParams } from "next/navigation"
import { CopyIcon } from "@radix-ui/react-icons"

export default function Page() {
  const searchParams = useSearchParams()
  const datasetId = searchParams.get("datasetid")
  const [{ userState }] = useContext(AppContext)
  const dataset = useFetch("view dataset", endPoints.airlakeViewDatasetsEndpoint, HTTPMethods.POST, { datasetId })
  const similarDatasets = useFetch("similar datasets", endPoints.airlakeFindSimilarDatasetsEndpoint, HTTPMethods.POST, { datasetId })
  const datasetIdForCard = datasetId?.toString() || ""

  const similarDatasetsToDisplay = similarDatasets?.data?.similarDatasets?.map((dataset: any) => {
    return <DatasetCard key={dataset._id} id={dataset._id} category={dataset.category} name={dataset?.name} rating={dataset?.rating} />
  })

  const datasetTagsToDisplay = dataset?.data?.description?.split(" ").slice(0, 30).map((item: string) => {
    if (item.length > 4) {
      return <Badge pill bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2" key={Math.random().toString()}>{item}</Badge>
    }
  })

  const copyPreviewDataAPI = (): void => {
    navigator.clipboard.writeText(`${endPoints.airlakePreviewDataApiEndpoint}?datasetId=${datasetId}`)
    toast.success(appConstants.CopiedToClipBoard)
  }

  const copyDataAPI = (): void => {
    navigator.clipboard.writeText(`${endPoints.airlakeDataApiEndpoint}/?datasetId=${datasetId}&apiKey=${userState.apiKey}`)
    toast.success(appConstants.CopiedToClipBoard)
  }

  return (
    <Fragment>
      <Show when={!dataset?.isLoading && !similarDatasets?.isLoading}>
        <Show when={!dataset.error && !!datasetId}>
          <Container>
            <div className="jumbotron p-4">
              <Row>
                <DatasetCard category={dataset?.data?.category} id={datasetIdForCard} name={dataset?.data?.name} rating={dataset?.data?.rating} key={datasetIdForCard} />
                <Col xs={12} sm={12} md={8} lg={9} xl={10}>
                  <p className="branding text-capitalize">{dataset?.data?.name}</p>
                  <p className="lead">{dataset?.data?.category}</p>
                  <p className="lead mt-3">{dataset?.data?.description}</p>
                  <div className="mb-3">{datasetTagsToDisplay}</div>
                  <Button onClick={copyPreviewDataAPI}>Preview Data API<CopyIcon className="icon-right" /></Button>
                  <Show when={userState.apiKey.length > 0}>
                    <Button onClick={copyDataAPI}>Data API <CopyIcon className="icon-right" /></Button>
                  </Show>
                </Col>
              </Row>
            </div>
            <Row>
              <p className="lead text-center text-white mb-4">Similar Datasets</p>
              {similarDatasetsToDisplay}
            </Row>
          </Container>
        </Show>
        <Show when={dataset.error || !datasetId}>
          <Error />
        </Show>
      </Show>
      <Show when={dataset?.isLoading || similarDatasets?.isLoading}>
        <Loading />
      </Show>
    </Fragment >
  )
}
