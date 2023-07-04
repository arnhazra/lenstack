import { Fragment, useContext, useState, useEffect } from 'react'
import { AppContext } from '@/context/appStateProvider'
import Show from '@/components/Show'
import Link from 'next/link'
import contractAddress from '@/constants/contractAddress'
import { toast } from 'react-hot-toast'
import withAuth from '@/utils/withAuth'
import { NextPage } from 'next'
import useFetchRealtime from '@/hooks/useFetchRealtime'
import endPoints from '@/constants/apiEndpoints'
import HTTPMethods from '@/constants/httpMethods'
import useFetch from '@/hooks/useFetch'
import Loading from '@/components/Loading'
import appConstants from '@/constants/appConstants'

const UsagePage: NextPage = () => {
    const [{ userState }] = useContext(AppContext)
    const usageDetails = useFetchRealtime('usage', endPoints.getUsageByApiKeyEndpoint, HTTPMethods.POST)
    const pricingDetails = useFetch('pricing', endPoints.getSubscriptionConfigEndpoint, HTTPMethods.POST)

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
            <Show when={!usageDetails.isLoading && !pricingDetails.isLoading}>
                <div className='bigbox'>
                    <p className='branding'>Usage<i className='fa-solid fa-code-pull-request'></i></p>
                    <Show when={userState.apiKey.length > 0}>
                        <p className='smalltext' title={userState.apiKey}>API Key - {showapiKey(userState.apiKey)}<i className='fa-solid fa-copy' onClick={copyapiKey}></i></p>
                    </Show>
                    <h4>
                        Plan - {userState.selectedPlan}
                        <Show when={userState.apiKey.length > 0}>
                            <Link title='Access NFT' target='_blank' passHref href={`https://mumbai.polygonscan.com/token/${contractAddress.nftContractAddress}?a=${userState.tokenId}`}>
                                <i className='fa-solid fa-shield'></i>
                            </Link>
                        </Show>
                    </h4>
                    <Show when={userState.apiKey.length > 0}>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>
                            {usageDetails.data?.airlakeApiRequestCount} / {pricingDetails.data?.[`${userState.selectedPlan.toLowerCase()}SubscriptionConfig`]?.requestLimit?.airlake} Airlake API Requests used
                        </p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>
                            {usageDetails.data?.evolakeQueryCount} / {pricingDetails.data?.[`${userState.selectedPlan.toLowerCase()}SubscriptionConfig`]?.requestLimit?.evolake} Evolake API Requests used
                        </p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>
                            {usageDetails.data?.frostlakeAnalyticsCount} / {pricingDetails.data?.[`${userState.selectedPlan.toLowerCase()}SubscriptionConfig`]?.requestLimit?.frostlake} Frostlake API Requests used
                        </p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>
                            {usageDetails.data?.icelakeDocumentCount} / {pricingDetails.data?.[`${userState.selectedPlan.toLowerCase()}SubscriptionConfig`]?.requestLimit?.icelake} Icelake API Requests used
                        </p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>
                            {usageDetails.data?.snowlakePrototypeCount} /{pricingDetails.data?.[`${userState.selectedPlan.toLowerCase()}SubscriptionConfig`]?.requestLimit?.snowlake} Snowlake API Requests used
                        </p>
                    </Show>
                </div>
            </Show>
            <Show when={usageDetails.isLoading || pricingDetails.isLoading}>
                <Loading />
            </Show>
        </Fragment >
    )
}

export default withAuth(UsagePage)