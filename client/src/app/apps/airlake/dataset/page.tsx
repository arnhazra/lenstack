"use client"
import { useContext } from "react"
import { Badge, Button, Container, Row } from "react-bootstrap"
import { Fragment } from "react"
import Loading from "@/_components/Loading"
import Show from "@/_components/Show"
import endPoints from "@/_constants/apiEndpoints"
import { toast } from "react-hot-toast"
import useFetch from "@/_hooks/useFetch"
import HTTPMethods from "@/_constants/httpMethods"
import Error from "@/_components/ErrorComp"
import { AppContext } from "@/_context/appStateProvider"
import Constants from "@/_constants/appConstants"
import { useSearchParams } from "next/navigation"
import { CopyIcon } from "@radix-ui/react-icons"
import { GenericAppCardInterface } from "@/_types/Types"
import GenericAppCard from "@/_components/GenericAppCard"
import GenericHero from "@/_components/GenericHero"

export default function Page() {
  const searchParams = useSearchParams()
  const datasetId = searchParams.get("datasetId")
  const [{ userState }] = useContext(AppContext)
  const dataset = useFetch("view dataset", endPoints.airlakeViewDatasetsEndpoint, HTTPMethods.POST, { datasetId })
  const similarDatasets = useFetch("similar datasets", endPoints.airlakeFindSimilarDatasetsEndpoint, HTTPMethods.POST, { datasetId })
  const datasetIdForCard = datasetId?.toString() || ""

  const similarDatasetsToDisplay = similarDatasets?.data?.similarDatasets?.map((dataset: any) => {
    const genericAppCardProps: GenericAppCardInterface = {
      badgeText: dataset.category,
      className: "centralized",
      headerText: dataset.name,
      footerText: `${dataset.description.slice(0, 110)}...`,
      redirectUri: `/apps/airlake/dataset?datasetId=${dataset._id}`
    }
    return <GenericAppCard key={dataset._id} genericAppCardProps={genericAppCardProps} />
  })

  const datasetTagsToDisplay = dataset?.data?.description?.split(" ").slice(0, 30).map((item: string) => {
    if (item.length > 4) {
      return <Badge pill bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2" key={Math.random().toString()}>{item}</Badge>
    }
  })

  const copyDatasetId = (): void => {
    navigator.clipboard.writeText(`${datasetId}`)
    toast.success(Constants.CopiedToClipBoard)
  }

  return (
    <Fragment>
      <Show when={!dataset?.isLoading && !similarDatasets?.isLoading}>
        <Show when={!dataset.error && !!datasetId}>
          <Container>
            <GenericHero>
              <p className="branding text-capitalize">{dataset?.data?.name}</p>
              <p className="lead">{dataset?.data?.category}</p>
              <p className="muted-text mt-3">{dataset?.data?.description}</p>
              <div className="mb-3">{datasetTagsToDisplay}</div>
              <Button onClick={copyDatasetId}><CopyIcon className="icon-left" />Copy Dataset ID</Button>
            </GenericHero>
            <Row>
              <h4 className="text-white mb-4">Similar Datasets</h4>
              {similarDatasetsToDisplay}
            </Row>
          </Container>
        </Show>
        <Show when={!!dataset.error || !datasetId}>
          <Error />
        </Show>
      </Show>
      <Show when={dataset?.isLoading || similarDatasets?.isLoading}>
        <Loading />
      </Show>
    </Fragment >
  )
}
