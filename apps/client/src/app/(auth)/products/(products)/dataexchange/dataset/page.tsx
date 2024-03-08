"use client"
import { Badge, Col, Container, Row } from "react-bootstrap"
import { Fragment, useCallback } from "react"
import Loading from "@/components/loading"
import Suspense from "@/components/suspense"
import { endPoints } from "@/constants/api-endpoints"
import useQuery from "@/hooks/use-query"
import HTTPMethods from "@/constants/http-methods"
import Error from "@/components/error"
import { useSearchParams } from "next/navigation"
import { BookmarkIcon, CubeIcon } from "@radix-ui/react-icons"
import Hero from "@/components/hero"
import SensitiveInfoPanel from "@/components/infopanel/sensitive-infopanel"
import { GenericCard, GenericCardProps } from "@/components/card"
import Grid from "@/components/grid"
import Link from "next/link"

export default function Page() {
  const searchParams = useSearchParams()
  const datasetId = searchParams.get("datasetId")
  const dataset = useQuery(["dataset"], `${endPoints.dataexchangeViewDatasets}?datasetId=${datasetId}`, HTTPMethods.GET)
  const similarDatasets = useQuery(["similardatasets"], `${endPoints.dataexchangeFindSimilarDatasets}?datasetId=${datasetId}`, HTTPMethods.GET)

  const displaySimilarDatasets = useCallback(() => {
    const similarDatasetsToDisplay = similarDatasets?.data?.similarDatasets?.map((dataset: any) => {
      const datasetCardProps: GenericCardProps = {
        header: dataset.name,
        footer: <Fragment>
          <Badge color="white" bg="light" pill className="ps-3 pe-3 p-2 ps-3 pe-3 p-2 align-self-start mb-4">{dataset.category}</Badge>
          <p className="text-muted">{dataset.description.slice(0, 150)}...</p>
        </Fragment>
      }

      return (
        <Col key={dataset._id} className="mb-3">
          <Link href={`/products/dataexchange/dataset?datasetId=${dataset._id}`}>
            <GenericCard {...datasetCardProps} />
          </Link>
        </Col>
      )
    })

    return (
      <Fragment>
        <h4 className="text-white">Similar Datasets</h4>
        <Grid>
          {similarDatasetsToDisplay}
        </Grid>
      </Fragment>
    )
  }, [similarDatasets?.data])

  const datasetQuality = useCallback(() => {
    const rating = dataset?.data?.rating
    if (rating > 4.5) {
      return <Badge pill className="gold-badge mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2" key={"gold"}><BookmarkIcon className="icon-left" />Gold</Badge>
    }

    else if (rating > 4.0 && rating < 4.5) {
      return <Badge pill className="silver-badge mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2" key={"silver"}><BookmarkIcon className="icon-left" />Silver</Badge>
    }

    else {
      return <Badge pill className="bronze-badge mt-2 me-2 top-0 end-0 ps-3 pe-3 p-2" key={"bronze"}><BookmarkIcon className="icon-left" />Bronze</Badge >
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
    <Suspense condition={!dataset?.isLoading && !similarDatasets?.isLoading} fallback={<Loading />}>
      <Suspense condition={!dataset.error && !!datasetId && !similarDatasets.error} fallback={<Error />}>
        <Container>
          <Hero>
            <p className="branding text-capitalize">{dataset?.data?.name}</p>
            <p className="lead">{dataset?.data?.category}</p>
            {datasetQuality()}
            <p className="text-muted mt-3">{dataset?.data?.description}</p>
            <div className="mb-4">{displayDatasetTags()}</div>
            <SensitiveInfoPanel credentialIcon={<CubeIcon />} credentialName="Dataset ID" credentialValue={datasetId ?? ""} />
          </Hero>
          {displaySimilarDatasets()}
        </Container>
      </Suspense>
    </Suspense>
  )
}
