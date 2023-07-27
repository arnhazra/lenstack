"use client"
import { Button, ButtonGroup } from "react-bootstrap"
import { Fragment, useContext, useEffect, useState } from "react"
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
    const [selectedPlan, setSelectedPlan] = useState("Standard")
    const [isSubscribeModalOpened, setSubscribeModalOpened] = useState(false)
    const [planPrice, setPlanPrice] = useState("")

    useEffect(() => {
        if (selectedPlan === "Standard") {
            setPlanPrice(pricingDetails.data?.standardSubscriptionConfig?.price)
        }

        if (selectedPlan === "Premium") {
            setPlanPrice(pricingDetails.data?.premiumSubscriptionConfig?.price)
        }
    }, [selectedPlan, pricingDetails.data])

    const hideSubscribeModal = () => {
        setSubscribeModalOpened(false)
    }

    return (
        <Fragment>
            <Show when={!pricingDetails.isLoading}>
                <div className="box">
                    <p className="branding">Subscribe</p>
                    <ButtonGroup className="btn-group-card">
                        <Button className={selectedPlan === "Standard" ? "btn-grp-btn-sel" : "btn-grp-btn"} onClick={(): void => setSelectedPlan("Standard")}>STANDARD</Button>
                        <Button className={selectedPlan === "Premium" ? "btn-grp-btn-sel" : "btn-grp-btn"} onClick={(): void => setSelectedPlan("Premium")}>PREMIUM</Button>
                    </ButtonGroup>
                    <div className="plans mt-2">
                        <Show when={selectedPlan === "Standard"}>
                            <p className="boxtext ms-2 mt-2">This plan is more intended towards individual use, offers all products with {pricingDetails.data?.standardSubscriptionConfig?.grantedTokens} tokens.</p>
                            <p className="branding text-center">{pricingDetails.data?.standardSubscriptionConfig?.price} MATIC/month</p>
                            <Button className="btn-block" disabled={!!userState.apiKey && userState.selectedPlan !== "Trial"} onClick={() => setSubscribeModalOpened(true)}>Pay & Subscribe<PlusCircledIcon className="icon-right" /></Button>
                        </Show>
                        <Show when={selectedPlan === "Premium"}>
                            <p className="boxtext ms-2 mt-2">This plan is more intended towards enterprise use, offers all products with {pricingDetails.data?.premiumSubscriptionConfig?.grantedTokens} Tokens</p>
                            <p className="branding text-center">{pricingDetails.data?.premiumSubscriptionConfig?.price} MATIC/month</p>
                            <Button className="btn-block" disabled={!!userState.apiKey && userState.selectedPlan !== "Trial"} onClick={() => setSubscribeModalOpened(true)}>Pay & Subscribe<PlusCircledIcon className="icon-right" /></Button>
                        </Show>
                    </div>
                </div>
                <SubscribeModal price={Number(planPrice) * 10000} isOpened={isSubscribeModalOpened} closeModal={() => { hideSubscribeModal() }} selectedPlan={selectedPlan} />
            </Show>
            <Show when={pricingDetails.isLoading}>
                <Loading />
            </Show>
        </Fragment>
    )
}

export default withAuth(SubscribePage)