"use client"
import { Button, ButtonGroup } from "react-bootstrap"
import { Fragment, useState } from "react"
import Show from "@/components/Show"
import { NextPage } from "next"
import useFetch from "@/hooks/useFetch"
import endPoints from "@/constants/apiEndpoints"
import HTTPMethods from "@/constants/httpMethods"
import Loading from "@/components/Loading"
import withoutAuth from "@/utils/withoutAuth"

const PricingPage: NextPage = () => {
    const pricingDetails = useFetch("pricing", endPoints.getSubscriptionConfigEndpoint, HTTPMethods.POST)
    const [selectedPlan, setSelectedPlan] = useState("Standard")

    return (
        <Fragment>
            <Show when={!pricingDetails.isLoading}>
                <div className="box">
                    <p className="branding">Pricing</p>
                    <ButtonGroup className="btn-group-card">
                        <Button className={selectedPlan === "Standard" ? "btn-grp-btn-sel" : "btn-grp-btn"} onClick={(): void => setSelectedPlan("Standard")}>STANDARD</Button>
                        <Button className={selectedPlan === "Premium" ? "btn-grp-btn-sel" : "btn-grp-btn"} onClick={(): void => setSelectedPlan("Premium")}>PREMIUM</Button>
                    </ButtonGroup>
                    <div className="plans mt-2">
                        <Show when={selectedPlan === "Standard"}>
                            <p className="boxtext ms-2 mt-2">This plan is more intended towards individual use, offers all products with {pricingDetails.data?.standardSubscriptionConfig?.grantedTokens} tokens.</p>
                            <p className="branding text-center">{pricingDetails.data?.standardSubscriptionConfig?.price} MATIC/month</p>
                        </Show>
                        <Show when={selectedPlan === "Premium"}>
                            <p className="boxtext ms-2 mt-2">This plan is more intended towards enterprise use, offers all products with {pricingDetails.data?.premiumSubscriptionConfig?.grantedTokens} Tokens</p>
                            <p className="branding text-center">{pricingDetails.data?.premiumSubscriptionConfig?.price} MATIC/month</p>
                        </Show>
                    </div>
                </div>
            </Show>
            <Show when={pricingDetails.isLoading}>
                <Loading />
            </Show>
        </Fragment>
    )
}

export default withoutAuth(PricingPage)