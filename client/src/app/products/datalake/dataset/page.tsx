"use client"
import { Badge, Container, Row } from "react-bootstrap"
import { Fragment } from "react"
import Loading from "@/components/loading.component"
import Show from "@/components/show.component"
import { endPoints } from "@/constants/api.endpoints"
import useFetch from "@/hooks/useFetch"
import HTTPMethods from "@/constants/http.methods"
import Error from "@/components/error.component"
import { useSearchParams } from "next/navigation"
import { CubeIcon } from "@radix-ui/react-icons"
import { ProductCardInterface } from "@/types/Types"
import ProductCard from "@/components/productcard.component"
import Hero from "@/components/hero.component"
import SecretCard from "@/components/secretcard.component"

export default function Page() {
  const searchParams = useSearchParams()
  const datasetId = searchParams.get("datasetId")
  const dataset = useFetch("view dataset", endPoints.datalakeViewDatasets, HTTPMethods.POST, { datasetId })
  const similarDatasets = useFetch("similar datasets", endPoints.datalakeFindSimilarDatasets, HTTPMethods.POST, { datasetId })

  const similarDatasetsToDisplay = similarDatasets?.data?.similarDatasets?.map((dataset: any) => {
    const productCardProps: ProductCardInterface = {
      badgeText: dataset.category,
      className: "centralized",
      headerText: dataset.name,
      footerText: `${dataset.description.slice(0, 110)}...`,
      redirectUri: `/products/datalake/dataset?datasetId=${dataset._id}`
    }
    return <ProductCard key={dataset._id} productCardProps={productCardProps} />
  })

  const datasetTagsToDisplay = dataset?.data?.description?.split(" ").slice(0, 30).map((item: string) => {
    if (item.length > 4) {
      return <Badge bg="light" className="mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2" key={Math.random().toString()}>{item}</Badge>
    }
  })

  return (
    <Fragment>
      <Show when={!dataset?.isLoading && !similarDatasets?.isLoading}>
        <Show when={!dataset.error && !!datasetId}>
          <Container>
            <Hero>
              <p className="branding text-capitalize">{dataset?.data?.name}</p>
              <p className="lead">{dataset?.data?.category}</p>
              <p className="muted-text mt-3">{dataset?.data?.description}</p>
              <div className="mb-4">{datasetTagsToDisplay}</div>
              <SecretCard credentialIcon={<CubeIcon />} credentialName="Dataset ID" credentialValue={datasetId ?? ""} />
            </Hero>
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
