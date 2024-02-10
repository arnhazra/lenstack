"use client"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import { Badge, Button, Col, Row } from "react-bootstrap"
import Hero from "./hero"
import { uiConstants } from "@/constants/global-constants"
import { useCallback } from "react"
import useQuery from "@/hooks/use-query"
import Suspense from "./suspense"
import { ArrowRightIcon, CheckIcon } from "@radix-ui/react-icons"
import Loading from "./loading"
import Error from "./error"
import { useRouter } from "next/navigation"

interface PricingProps {
  readonly: boolean
}

export default function Pricing({ readonly }: PricingProps) {
  const pricingDetails = useQuery(["pricing"], endPoints.getSubscriptionConfig, HTTPMethods.GET)
  const router = useRouter()

  const displayPricing = useCallback(() => {
    const productsToDisplay = pricingDetails?.data?.map((pricing: any) => {
      return (
        <Col key={pricing.planName}>
          <Hero>
            <div className="d-flex justify-content-between align-items-start">
              <p className="text-muted">{uiConstants.brandName}</p>
              <Suspense condition={pricing.isMostEfficient} fallback={null}>
                <Badge className="ps-3 pe-3 p-2 pricing-badge ps-3 pe-3 p-2 pricing-badge align-self-start">Most Efficient</Badge>
              </Suspense>
            </div>
            <h4 className="branding">{pricing.planName}</h4>
            <h2>{pricing.price} MATIC</h2>
            <h5 className="mb-3 mt-3">{Number(pricing.grantedCredits).toLocaleString()} Credits</h5>
            {pricing?.features?.map((feature: string) => <p className="text-secondary"><CheckIcon className="icon-left" />{feature}</p>)}
            <Button variant="primary" disabled={readonly} className="btn-block pt-3 pb-3" onClick={(): void => router.push(`/subscription/pay?planName=${pricing.planName}`)}>
              Select & Continue<ArrowRightIcon className="icon-right" />
            </Button>
          </Hero>
        </Col >
      )
    })

    return (
      <Suspense condition={!!pricingDetails?.data?.length} fallback={<h4>No plans to display</h4>}>
        <p className="display-4 text-center mb-4">Find a plan to <br />Power your projects</p>
        <div>
          <Row xs={1} sm={1} md={2} lg={3} xl={4} className="justify-content-center">
            {productsToDisplay}
          </Row>
        </div>
      </Suspense>
    )
  }, [pricingDetails?.data])

  return (
    <Suspense condition={!pricingDetails.isLoading} fallback={<Loading />}>
      <Suspense condition={!pricingDetails.error} fallback={<Error />}>
        {displayPricing()}
      </Suspense>
    </Suspense>
  )
}
