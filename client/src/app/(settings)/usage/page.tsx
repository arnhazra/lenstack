"use client"
import { Fragment, useContext, useState } from "react"
import { AppContext } from "@/context/appStateProvider"
import Show from "@/components/Show"
import { toast } from "react-hot-toast"
import withAuth from "@/utils/withAuth"
import { NextPage } from "next"
import useFetchRealtime from "@/hooks/useFetchRealtime"
import endPoints from "@/constants/apiEndpoints"
import HTTPMethods from "@/constants/httpMethods"
import useFetch from "@/hooks/useFetch"
import Loading from "@/components/Loading"
import appConstants from "@/constants/appConstants"
import moment from "moment"
import UnsubscribeModal from "@/components/UnsubscribeModal"
import { Button, Col, Row } from "react-bootstrap"
import { LockOpen1Icon, CalendarIcon, BookmarkIcon, BarChartIcon, CrossCircledIcon, CopyIcon } from "@radix-ui/react-icons"

const UsagePage: NextPage = () => {
    const contractAddress = useFetch("contract-address", endPoints.getContractAddressList, HTTPMethods.POST)
    const [{ userState }] = useContext(AppContext)
    const [isUnsubscribeModalOpened, setUnsubscribeModalOpened] = useState(false)
    const usageDetails = useFetchRealtime("usage", endPoints.getUsageByApiKeyEndpoint, HTTPMethods.POST)
    const pricingDetails = useFetch("pricing", endPoints.getSubscriptionConfigEndpoint, HTTPMethods.POST)

    const usedTokens = usageDetails.data?.usedTokens > pricingDetails.data?.[`${userState.selectedPlan.toLowerCase()}SubscriptionConfig`]?.grantedTokens ? pricingDetails.data?.[`${userState.selectedPlan.toLowerCase()}SubscriptionConfig`]?.grantedTokens : usageDetails.data?.usedTokens

    const showapiKey = (apiKey: string) => {
        const displayapiKey = `(${apiKey.substring(0, 3)}...${apiKey.substring(apiKey.length - 3)})`
        return displayapiKey
    }

    const copyapiKey = (): void => {
        navigator.clipboard.writeText(`${userState.apiKey}`)
        toast.success(appConstants.CopiedToClipBoard)
    }

    const hideUnsubscribeModal = () => {
        setUnsubscribeModalOpened(false)
    }

    const calculateDaysRemaining = (targetDateString: string): number => {
        const targetDate: Date = new Date(targetDateString)
        const currentDate: Date = new Date()
        const timeDifference: number = targetDate.getTime() - currentDate.getTime()
        const daysRemaining: number = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
        return daysRemaining
    }

    const subscriptionAmount = pricingDetails?.data?.[`${userState.selectedPlan.toLowerCase()}SubscriptionConfig`]?.price
    const tokensRemainingPercent = Number(pricingDetails?.data?.[`${userState.selectedPlan.toLowerCase()}SubscriptionConfig`]?.grantedTokens - usedTokens) / Number(pricingDetails?.data?.[`${userState.selectedPlan.toLowerCase()}SubscriptionConfig`]?.grantedTokens)
    const daysRemainingPercent = calculateDaysRemaining(userState.subscriptionValidUpto) / 30

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
                                    {showapiKey(userState.apiKey)}<CopyIcon className="icon-right" />
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
                                    {usedTokens} / {pricingDetails.data?.[`${userState.selectedPlan.toLowerCase()}SubscriptionConfig`]?.grantedTokens} Tokens used
                                </Show>
                                <Show when={!userState.apiKey}>
                                    No API Key Usage Data
                                </Show>
                            </div>
                        </Col>
                    </Row>
                    <Show when={!!userState.apiKey}>
                        <Button className="btn-block btn-red mb-2 mt-3" disabled={userState.selectedPlan === "Trial"} onClick={() => setUnsubscribeModalOpened(true)}>Cancel Subscription<CrossCircledIcon className="icon-right" /></Button>
                    </Show>
                </div>
            </Show>
            <Show when={usageDetails.isLoading || pricingDetails.isLoading || contractAddress.isLoading}>
                <Loading />
            </Show>
            <UnsubscribeModal tokenId={userState.tokenId} refundAmount={Number(subscriptionAmount * tokensRemainingPercent * daysRemainingPercent) * 10000} isOpened={isUnsubscribeModalOpened} closeModal={() => { hideUnsubscribeModal() }} />
        </Fragment >
    )
}

export default withAuth(UsagePage)