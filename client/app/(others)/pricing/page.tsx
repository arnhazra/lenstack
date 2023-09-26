"use client"
import { Fragment } from "react"
import Show from "@/_components/Show"
import useFetch from "@/_hooks/useFetch"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import Loading from "@/_components/Loading"

export default function Page() {
    const pricingDetails = useFetch("pricing", endPoints.getSubscriptionConfigEndpoint, HTTPMethods.POST)

    return (
        <Fragment>
            <Show when={!pricingDetails.isLoading}>
                <div className="box">
                    <p className="branding">Pricing</p>
                    <div className="plans mt-2">
                        <p className="boxtext ms-2 mt-2">This plan is more intended towards enterprise use, offers all apps with {pricingDetails.data?.proSubscriptionConfig?.grantedTokens} Tokens</p>
                        <p className="branding text-center">{pricingDetails.data?.proSubscriptionConfig?.price} MATIC/month</p>
                    </div>
                </div>
            </Show>
            <Show when={pricingDetails.isLoading}>
                <Loading />
            </Show>
        </Fragment>
    )
}
