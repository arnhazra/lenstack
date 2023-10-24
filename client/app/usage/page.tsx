"use client"
import { Fragment, useContext } from "react"
import { AppContext } from "@/_context/appStateProvider"
import Show from "@/_components/Show"
import { toast } from "sonner"
import useFetchRealtime from "@/_hooks/useFetchRealtime"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import useFetch from "@/_hooks/useFetch"
import Loading from "@/_components/Loading"
import appConstants from "@/_constants/appConstants"
import moment from "moment"
import { Button, Col, Row } from "react-bootstrap"
import { LockOpen1Icon, CalendarIcon, BookmarkIcon, BarChartIcon, CopyIcon } from "@radix-ui/react-icons"

export default function Page() {
  const contractAddress = useFetch("contract-address", endPoints.getSecretConfig, HTTPMethods.POST)
  const [{ userState }] = useContext(AppContext)
  const usageDetails = useFetchRealtime("usage", endPoints.getUsageByApiKeyEndpoint, HTTPMethods.POST)
  const pricingDetails = useFetch("pricing", endPoints.getSubscriptionConfigEndpoint, HTTPMethods.POST)

  const usedCredits = usageDetails.data?.usedCredits > pricingDetails.data?.[`${userState.selectedPlan.toLowerCase()}SubscriptionConfig`]?.grantedCredits ? pricingDetails.data?.[`${userState.selectedPlan.toLowerCase()}SubscriptionConfig`]?.grantedCredits : usageDetails.data?.usedCredits

  const showapiKey = (apiKey: string) => {
    const displayapiKey = `(${apiKey.substring(0, 3)}...${apiKey.substring(apiKey.length - 3)})`
    return displayapiKey
  }

  const copyapiKey = (): void => {
    navigator.clipboard.writeText(`${userState.apiKey}`)
    toast.success(appConstants.CopiedToClipBoard)
  }

  return (
    <Fragment>
      <Show when={!usageDetails.isLoading && !pricingDetails.isLoading && !contractAddress.isLoading}>
        <div className="box">
          <p className="branding">Usage</p>
          <p className="boxtext">Track your API Key usage from here</p>
          <Row className="mb-2 mt-4">
            <Col className="categorycol">
              <LockOpen1Icon />
            </Col>
            <Col>
              <p className="boxcategorytext">API Key</p>
              <div className="boxcategorytext">
                <Show when={!!userState.apiKey}>
                  {showapiKey(userState.apiKey)}<CopyIcon className="icon-right" onClick={copyapiKey} />
                </Show>
                <Show when={!userState.apiKey}>
                  No API Key
                </Show>
              </div>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col className="categorycol">
              <CalendarIcon />
            </Col>
            <Col>
              <p className="boxcategorytext">Validity</p>
              <div className="boxcategorytext">
                <Show when={!!userState.apiKey}>
                  <p>Valid upto {moment(userState.subscriptionValidUpto).format("MMM, Do YYYY")}</p>
                </Show>
                <Show when={!userState.apiKey}>
                  <p>No Validity Data</p>
                </Show>
              </div>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col className="categorycol">
              <BookmarkIcon />
            </Col>
            <Col>
              <p className="boxcategorytext">Selected Plan</p>
              <p className="boxcategorytext">
                {userState.selectedPlan}
              </p>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col className="categorycol">
              <BarChartIcon />
            </Col>
            <Col>
              <p className="boxcategorytext">Key Usage</p>
              <div className="boxcategorytext">
                <Show when={!!userState.apiKey}>
                  {usedCredits} / {pricingDetails.data?.[`${userState.selectedPlan.toLowerCase()}SubscriptionConfig`]?.grantedCredits} Credits used
                </Show>
                <Show when={!userState.apiKey}>
                  No API Key Usage Data
                </Show>
              </div>
            </Col>
          </Row>
        </div>
      </Show>
      <Show when={usageDetails.isLoading || pricingDetails.isLoading || contractAddress.isLoading}>
        <Loading />
      </Show>
    </Fragment >
  )
}
