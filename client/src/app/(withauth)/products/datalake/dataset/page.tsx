"use client"
import { Badge, Container, Row } from "react-bootstrap"
import { Fragment, useCallback } from "react"
import Loading from "@/components/loading-component"
import Show from "@/components/show-component"
import { endPoints } from "@/constants/api-endpoints"
import useQuery from "@/hooks/use-query"
import HTTPMethods from "@/constants/http-methods"
import Error from "@/components/error-component"
import { useSearchParams } from "next/navigation"
import { BookmarkIcon, CubeIcon } from "@radix-ui/react-icons"
import ProductCard, { ProductCardInterface } from "@/components/productcard-component"
import Hero from "@/components/hero-component"
import SensitiveInfoPanel from "@/components/sensitiveinfopanel-component"

export default function Page() {
  const searchParams = useSearchParams()
  const datasetId = searchParams.get("datasetId")
  const dataset = useQuery("view-dataset", `${endPoints.datalakeViewDatasets}?datasetId=${datasetId}`, HTTPMethods.GET)
  const similarDatasets = useQuery("view-similar-datasets", `${endPoints.datalakeFindSimilarDatasets}?datasetId=${datasetId}`, HTTPMethods.GET)

  const displaySimilarDatasets = useCallback(() => {
    const similarDatasetsToDisplay = similarDatasets?.data?.similarDatasets?.map((dataset: any) => {
      const productCardProps: ProductCardInterface = {
        badgeText: dataset.category,
        className: "centralized",
        headerText: dataset.name,
        footerText: `${dataset.description.slice(0, 110)}...`,
        redirectUri: `/products/datalake/dataset?datasetId=${dataset._id}`
      }

      return <ProductCard productCardProps={productCardProps} />
    })

    return (
      <Fragment>
        <h4 className="text-white">Similar Datasets</h4>
        <Row xs={1} sm={1} md={2} lg={3} xl={4}>
          {similarDatasetsToDisplay}
        </Row>
      </Fragment>
    )
  }, [similarDatasets?.data])

  const datasetQuality = useCallback(() => {
    const rating = dataset?.data?.rating
    if (rating > 4.5) {
      return <Badge className="gold-badge mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2" key={"gold"}><BookmarkIcon className="icon-left" />Gold</Badge>
    }

    else if (rating > 4.0 && rating < 4.5) {
      return <Badge className="silver-badge mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2" key={"silver"}><BookmarkIcon className="icon-left" />Silver</Badge>
    }

    else {
      return <Badge className="bronze-badge mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2" key={"bronze"}><BookmarkIcon className="icon-left" />Bronze</Badge >
    }
  }, [dataset?.data?.rating])

  const displayDatasetTags = useCallback(() => {
    const datasetTagsToDisplay = dataset?.data?.description?.split(" ").slice(0, 30).map((item: string, index: number) => {
      if (item.length > 4) {
        return <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2" key={index}>{item}</Badge>
      }
    })

    return datasetTagsToDisplay
  }, [dataset?.data?.description])

  return (
    <Fragment>
      <Show when={!dataset?.isLoading && !similarDatasets?.isLoading}>
        <Show when={!dataset.error && !!datasetId}>
          <Container>
            <Hero>
              <p className="branding text-capitalize">{dataset?.data?.name}</p>
              <p className="lead">{dataset?.data?.category}</p>
              {datasetQuality()}
              <p className="muted-text mt-3">{dataset?.data?.description}</p>
              <div className="mb-4">{displayDatasetTags()}</div>
              <SensitiveInfoPanel credentialIcon={<CubeIcon />} credentialName="Dataset ID" credentialValue={datasetId ?? ""} />
            </Hero>
            {displaySimilarDatasets()}
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
