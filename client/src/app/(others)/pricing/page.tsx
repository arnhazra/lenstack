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

    return (
        <Fragment>
            <Show when={!pricingDetails.isLoading}>
                <div className="box">
                    <p className="branding">Pricing</p>
                    <div className="plans mt-2">
                        <p className="boxtext ms-2 mt-2">This plan is more intended towards enterprise use, offers all products with {pricingDetails.data?.proSubscriptionConfig?.grantedTokens} Tokens</p>
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

export default withoutAuth(PricingPage)