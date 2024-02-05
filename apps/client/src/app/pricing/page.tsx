"use client"
import Error from "@/components/error"
import Grid from "@/components/grid"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Loading from "@/components/loading"
import Suspense from "@/components/suspense"
import { endPoints } from "@/constants/api-endpoints"
import { uiConstants } from "@/constants/global-constants"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { ArrowRightIcon, CheckIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { Fragment, useCallback } from "react"

export default function Page() {
  const pricingDetails = useQuery(["pricing"], endPoints.getSubscriptionConfig, HTTPMethods.GET)

  const displayPricing = useCallback(() => {
    const princingToDisplay = pricingDetails?.data?.map((pricing: any) => {
      return (
        <Hero key={pricing.planName}>
          <div>
            <p className="text-secondary">{uiConstants.brandName}</p>
            <h4 className="branding">{pricing.planName}</h4>
            <h2>{pricing.price} MATIC</h2>
            <h5 className="mb-3 mt-3">{Number(pricing.grantedCredits).toLocaleString()} Credits</h5>
            <p className="text-secondary"><CheckIcon className="icon-left" />Valid for a month</p>
            <p className="text-secondary">
              <Suspense condition={pricing.price !== 0} fallback={<><CheckIcon className="icon-left" />Try all features</>}>
                <CheckIcon className="icon-left" />Exclusive access
              </Suspense>
            </p>
            <p className="text-secondary"><CheckIcon className="icon-left" />{Number(pricing.grantedCredits).toLocaleString()} Credits</p>
            <p className="text-secondary">
              <Suspense condition={pricing.price !== 0} fallback={<><CheckIcon className="icon-left" />Regular API Response</>}>
                <CheckIcon className="icon-left" />Priority API Response
              </Suspense>
            </p>
            <p className="text-secondary">
              <Suspense condition={pricing.price !== 0} fallback={<><CheckIcon className="icon-left" />Completely free</>}>
                <CheckIcon className="icon-left" />Discontinue anytime
              </Suspense>
            </p>
            <Link className="btn btn-primary btn-block" href={`/subscription/pay?planName=${pricing.planName}`}>
              Select & Continue<ArrowRightIcon className="icon-right" />
            </Link>
          </div>
        </Hero>
      )
    })

    return (
      <Suspense condition={!!pricingDetails?.data?.length} fallback={<h4 className="text-white">No plans to display</h4>}>
        <h4 className="text-white">Find a plan that works</h4>
        <Grid sm={1} md={2} lg={3} xl={4}>
          {princingToDisplay}
        </Grid>
      </Suspense>
    )
  }, [pricingDetails?.data])

  return (
    <Fragment>
      <Suspense condition={!pricingDetails.isLoading} fallback={<Loading />}>
        <Suspense condition={!pricingDetails.error} fallback={<Error />}>
          <nav className="header">
            <Header isAuthorized={false} />
          </nav>
          <div className="container mx-auto px-3">
            {displayPricing()}
          </div>
        </Suspense>
      </Suspense>
    </Fragment>
  )
}
