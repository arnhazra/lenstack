"use client"
import Hero from "@/components/hero"
import Loading from "@/components/loading"
import Suspense from "@/components/suspense"
import { endPoints } from "@/constants/api-endpoints"
import { uiConstants } from "@/constants/global-constants"
import HTTPMethods from "@/constants/http-methods"
import { useConfirmContext } from "@/providers/confirm.provider"
import { GlobalContext } from "@/context/globalstate.provider"
import useQuery from "@/hooks/use-query"
import { ArrowRightIcon, CheckIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Fragment, useCallback, useContext } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import toast from "react-hot-toast"

export default function Page() {
  const pricingDetails = useQuery(["pricing"], endPoints.getSubscriptionConfig, HTTPMethods.GET)
  const [{ userState }, dispatch] = useContext(GlobalContext)
  const { confirm } = useConfirmContext()
  const router = useRouter()

  const activateTrial = async () => {
    const userConsent = await confirm("Are you sure to activate Trial ?")

    if (userConsent) {
      try {
        await axios.get(endPoints.activateTrial)
        dispatch("setAppState", { refreshId: Math.random().toString(36).substring(7) })
        toast.success(uiConstants.toastSuccess)
      }

      catch (error) {
        toast.error(uiConstants.toastError)
      }

      finally {
        router.refresh()
        router.push("/subscription")
      }
    }
  }

  const selectPlan = (planName: string) => {
    if (planName === "trial") {
      activateTrial()
    }

    else {
      router.push(`/subscription/plans/checkout?planName=${planName}`)
    }
  }

  const displayPricing = useCallback(() => {
    const productsToDisplay = pricingDetails?.data?.map((pricing: any) => {
      return (
        <Col key={pricing.planName}>
          <Hero>
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
              <Suspense condition={pricing.price !== 0} fallback={<><CheckIcon className="icon-left" />One month trial</>}>
                <CheckIcon className="icon-left" />Discontinue anytime
              </Suspense>
            </p>
            <Button disabled={(!pricing.price && !userState.trialAvailable) || userState.hasActiveSubscription} variant="primary" className="btn-block" onClick={(): void => selectPlan(pricing.planName)}>
              Select & Continue<ArrowRightIcon className="icon-right" />
            </Button>
          </Hero>
        </Col >
      )
    })

    return (
      <Suspense condition={!!pricingDetails?.data?.length} fallback={<h4 className="text-white">No Plans to display</h4>}>
        <h4 className="text-white">Select a Plan</h4>
        <div>
          <Row xs={1} sm={1} md={2} lg={3} xl={4} className="justify-content-center">
            {productsToDisplay}
          </Row>
        </div>
      </Suspense>
    )
  }, [pricingDetails?.data])

  return (
    <Fragment>
      <Suspense condition={!pricingDetails.isLoading} fallback={<Loading />}>
        <Container>
          {displayPricing()}
        </Container>
      </Suspense>
    </Fragment>
  )
}
