"use client"
import Grid from "@/components/grid"
import Suspense from "@/components/suspense"
import { endPoints } from "@/constants/api-endpoints"
import { uiConstants } from "@/constants/global-constants"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { ArrowRightIcon, CheckIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { Fragment, useEffect, useState } from "react"
import { Badge, Button, Col, Container } from "react-bootstrap"
import Loading from "@/components/loading"
import Error from "@/components/error"
import { GenericCard, GenericCardProps } from "@/components/card"

export default function Page() {
  const pricingDetails = useQuery(["pricing"], endPoints.getSubscriptionConfig, HTTPMethods.GET)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      router.push("/subscription/plans")
    }

    else {
      setIsLoading(false)
    }
  }, [])

  const renderPricing = pricingDetails?.data?.map((pricing: any) => {
    const pricingCardProps: GenericCardProps = {
      header: uiConstants.brandName,
      footer: <Fragment>
        <div className="d-flex justify-content-between align-items-start">
          <p className="branding">{pricing.planName}</p>
          <Suspense condition={pricing.isMostEfficient} fallback={null}>
            <Badge color="white" bg="light" pill className="ps-3 pe-3 p-2 ps-3 pe-3 p-2 align-self-start">Most Efficient</Badge>
          </Suspense>
        </div>
        <h2>{pricing.price} MATIC</h2>
        <h5 className="mb-3 mt-3">{Number(pricing.grantedCredits).toLocaleString()} Credits</h5>
        {pricing?.features?.map((feature: string) => <p className="text-secondary"><CheckIcon className="icon-left" />{feature}</p>)}
        <Button variant="primary" className="btn-block" onClick={(): void => router.push(`/subscription/pay?planName=${pricing.planName}`)}>
          Select & Continue<ArrowRightIcon className="icon-right" />
        </Button>
      </Fragment>,
    }

    return (
      <Col key={pricing.planName} className="mb-3">
        <GenericCard {...pricingCardProps} />
      </Col>
    )
  })

  return (
    <Container>
      <Suspense condition={!pricingDetails.isLoading && !isLoading} fallback={<Loading />}>
        <Suspense condition={!pricingDetails.error} fallback={<Error />}>
          <Suspense condition={!!pricingDetails?.data?.length} fallback={<h4 className="text-white">No plans to display</h4>}>
            <h4 className="text-white">Find a plan that works</h4>
            <div>
              <Grid className="justify-content-center">
                {renderPricing}
              </Grid>
            </div>
          </Suspense>
        </Suspense>
      </Suspense>
    </Container>
  )
}