"use client"
import { Fragment, useContext, useState } from 'react'
import { AppContext } from '@/context/appStateProvider'
import Show from '@/components/Show'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import withAuth from '@/utils/withAuth'
import { NextPage } from 'next'
import useFetchRealtime from '@/hooks/useFetchRealtime'
import endPoints from '@/constants/apiEndpoints'
import HTTPMethods from '@/constants/httpMethods'
import useFetch from '@/hooks/useFetch'
import Loading from '@/components/Loading'
import appConstants from '@/constants/appConstants'
import moment from 'moment'
import UnsubscribeModal from '@/components/UnsubscribeModal'
import { Button } from 'react-bootstrap'

const UsagePage: NextPage = () => {
    const contractAddress = useFetch('contract-address', endPoints.getContractAddressList, HTTPMethods.POST)
    const [{ userState }] = useContext(AppContext)
    const [isUnsubscribeModalOpened, setUnsubscribeModalOpened] = useState(false)
    const usageDetails = useFetchRealtime('usage', endPoints.getUsageByApiKeyEndpoint, HTTPMethods.POST)
    const pricingDetails = useFetch('pricing', endPoints.getSubscriptionConfigEndpoint, HTTPMethods.POST)

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

    return (
        <Fragment>
            <Show when={!usageDetails.isLoading && !pricingDetails.isLoading && !contractAddress.isLoading}>
                <div className='box'>
                    <p className='branding'>Usage<i className='fa-solid fa-chart-pie'></i></p>
                    <Show when={!!userState.apiKey}>
                        <p className='smalltext' title={userState.apiKey}>API Key - {showapiKey(userState.apiKey)}<i className='fa-solid fa-copy' onClick={copyapiKey}></i></p>
                        <p className='smalltext'>Valid upto {moment(userState.subscriptionValidUpto).format('MMM, Do YYYY')}</p>
                    </Show>
                    <h4>
                        {userState.selectedPlan}
                        <Show when={!!userState.apiKey && userState.selectedPlan !== 'Trial'}>
                            <Link title='Access NFT' target='_blank' passHref href={`https://mumbai.polygonscan.com/token/${contractAddress?.data?.nftContractAddress}?a=${userState.tokenId}`}>
                                <img src='https://cdn-icons-png.flaticon.com/128/6298/6298900.png' height={40} width={40}></img>
                            </Link>
                        </Show>
                    </h4>
                    <Show when={!!userState.apiKey}>
                        <p className='branding'>
                            {usedTokens} / {pricingDetails.data?.[`${userState.selectedPlan.toLowerCase()}SubscriptionConfig`]?.grantedTokens} Tokens used
                        </p>
                        <Button className='btn-block' disabled={userState.selectedPlan === 'Trial'} onClick={() => setUnsubscribeModalOpened(true)}>Cancel Subscription<i className='fa-solid fa-circle-arrow-right'></i></Button>
                    </Show>
                </div>
            </Show>
            <Show when={usageDetails.isLoading || pricingDetails.isLoading || contractAddress.isLoading}>
                <Loading />
            </Show>
            <UnsubscribeModal tokenId={userState.tokenId} refundAmount={Number(0.2) * 5000} isOpened={isUnsubscribeModalOpened} closeModal={() => { hideUnsubscribeModal() }} />
        </Fragment >
    )
}

export default withAuth(UsagePage)