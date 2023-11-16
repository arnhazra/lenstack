"use client"
import { Badge, Button, Container, Row } from "react-bootstrap"
import { Fragment } from "react"
import Loading from "@/components/loading.component"
import Show from "@/components/show.component"
import { endPoints } from "@/constants/api.endpoints"
import { toast } from "react-hot-toast"
import useFetch from "@/hooks/useFetch"
import HTTPMethods from "@/constants/http.methods"
import Error from "@/components/error.component"
import Constants from "@/constants/global.constants"
import { useSearchParams } from "next/navigation"
import { CopyIcon } from "@radix-ui/react-icons"
import { GenericProductCardInterface } from "@/types/Types"
import GenericProductCard from "@/components/genericproductcard.component"
import GenericHero from "@/components/generichero.component"

export default function Page() {
  const searchParams = useSearchParams()
  const datasetId = searchParams.get("datasetId")
  const dataset = useFetch("view dataset", endPoints.airlakeViewDatasets, HTTPMethods.POST, { datasetId })
  const similarDatasets = useFetch("similar datasets", endPoints.airlakeFindSimilarDatasets, HTTPMethods.POST, { datasetId })

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
