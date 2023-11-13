"use client"
import { useContext } from "react"
import { Badge, Button, Container, Row } from "react-bootstrap"
import { Fragment } from "react"
import Loading from "@/components/Loading"
import Show from "@/components/Show"
import endPoints from "@/constants/apiEndpoints"
import { toast } from "react-hot-toast"
import useFetch from "@/hooks/useFetch"
import HTTPMethods from "@/constants/httpMethods"
import Error from "@/components/ErrorComp"
import Constants from "@/constants/globalConstants"
import { useSearchParams } from "next/navigation"
import { CopyIcon } from "@radix-ui/react-icons"
import { GenericProductCardInterface } from "@/types/Types"
import GenericProductCard from "@/components/GenericProductCard"
import GenericHero from "@/components/GenericHero"

export default function Page() {
  const searchParams = useSearchParams()
  const datasetId = searchParams.get("datasetId")
  const dataset = useFetch("view dataset", endPoints.airlakeViewDatasetsEndpoint, HTTPMethods.POST, { datasetId })
  const similarDatasets = useFetch("similar datasets", endPoints.airlakeFindSimilarDatasetsEndpoint, HTTPMethods.POST, { datasetId })

  const similarDatasetsToDisplay = similarDatasets?.data?.similarDatasets?.map((dataset: any) => {
    const genericProductCardProps: GenericProductCardInterface = {
      badgeText: dataset.category,
      className: "centralized",
      headerText: dataset.name,
      footerText: `${dataset.description.slice(0, 110)}...`,
      redirectUri: `/products/airlake/dataset?datasetId=${dataset._id}`
    }
    return <GenericProductCard key={dataset._id} genericProductCardProps={genericProductCardProps} />
  })

  const datasetTagsToDisplay = dataset?.data?.description?.split(" ").slice(0, 30).map((item: string) => {
    if (item.length > 4) {
      return <Badge bg="dark" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2" key={Math.random().toString()}>{item}</Badge>
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
              <h4 className="text-white">Similar Datasets</h4>
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
