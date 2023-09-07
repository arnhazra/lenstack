"use client"
import { Button } from "react-bootstrap"
import { Fragment, useContext, useState } from "react"
import { AppContext } from "@/context/appStateProvider"
import Show from "@/components/Show"
import SubscribeModal from "@/components/SubscribeModal"
import withAuth from "@/utils/withAuth"
import { NextPage } from "next"
import useFetch from "@/hooks/useFetch"
import endPoints from "@/constants/apiEndpoints"
import HTTPMethods from "@/constants/httpMethods"
import Loading from "@/components/Loading"
import { PlusCircledIcon } from "@radix-ui/react-icons"

const SubscribePage: NextPage = () => {
    const [{ userState }] = useContext(AppContext)
    const pricingDetails = useFetch("pricing", endPoints.getSubscriptionConfigEndpoint, HTTPMethods.POST)
    const [selectedPlan] = useState("Pro")
    const [isSubscribeModalOpened, setSubscribeModalOpened] = useState(false)

    const hideSubscribeModal = () => {
        setSubscribeModalOpened(false)
    }

    return (
        <Fragment>
            <Show when={!pricingDetails.isLoading}>
                <div className="box">
                    <p className="branding">Subscribe</p>
                    <div className="plans mt-2">
                        <p className="boxtext ms-2 mt-2">This plan, offers all product subscriptions with {pricingDetails.data?.proSubscriptionConfig?.grantedTokens} Tokens</p>
                        <p className="branding text-center">{pricingDetails.data?.proSubscriptionConfig?.price} MATIC/month</p>
                        <Button className="btn-block" disabled={!!userState.apiKey && userState.selectedPlan !== "Trial"} onClick={() => setSubscribeModalOpened(true)}>Pay & Subscribe<PlusCircledIcon className="icon-right" /></Button>
                    </div>
                </div>
                <SubscribeModal price={Number(pricingDetails.data?.proSubscriptionConfig?.price) * 10000} isOpened={isSubscribeModalOpened} closeModal={() => { hideSubscribeModal() }} selectedPlan={selectedPlan} />
            </Show>
            <Show when={pricingDetails.isLoading}>
                <Loading />
            </Show>
        </Fragment>
    )
}

export default withAuth(SubscribePage)