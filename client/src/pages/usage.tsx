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
    const [tokenId, setTokenId] = useState('')
    const [selectedPlan, setSelectedPlan] = useState('No Subscription')
    const usageDetails = useFetchRealtime('usage', endPoints.getUsageBySubscriptionKeyEndpoint, HTTPMethods.POST, {})
    const pricingDetails = useFetch('pricing', endPoints.getSubscriptionConfigEndpoint, HTTPMethods.POST, {})
    console.log(usageDetails)

    useEffect(() => {
        try {
            if (userState.subscriptionKey.length > 0) {
                setSelectedPlan(userState.subscriptionKey.startsWith('sk') ? 'Standard' : 'Premium')
                setTokenId(userState.subscriptionKey.split('-')[2])
            }

            else {
                setSelectedPlan('No Subscription')
                setTokenId('')
            }
        } catch (error) {
            setSelectedPlan('No Subscription')
            setTokenId('')
        }
    }, [userState.subscriptionKey])

    const showSubscriptionKey = (subscriptionKey: string) => {
        const displaySubscriptionKey = `(${subscriptionKey.substring(0, 3)}...${subscriptionKey.substring(subscriptionKey.length - 3)})`
        return displaySubscriptionKey
    }

    const copySubscriptionKey = (): void => {
        navigator.clipboard.writeText(`${userState.subscriptionKey}`)
        toast.success(appConstants.CopiedToClipBoard)
    }

    return (
        <Fragment>
            <Show when={!usageDetails.isLoading && !pricingDetails.isLoading}>
                <div className='bigbox'>
                    <p className='branding'>Usage<i className='fa-solid fa-code-pull-request'></i></p>
                    <Show when={userState.subscriptionKey.length > 0}>
                        <p className='smalltext' title={userState.subscriptionKey}>Subscription Key - {showSubscriptionKey(userState.subscriptionKey)}<i className='fa-solid fa-copy' onClick={copySubscriptionKey}></i></p>
                    </Show>
                    <h4>
                        Plan - {selectedPlan}
                        <Show when={userState.subscriptionKey.length > 0}>
                            <Link title='Access NFT' target='_blank' passHref href={`https://mumbai.polygonscan.com/token/${contractAddress.nftContractAddress}?a=${tokenId}`}>
                                <i className='fa-solid fa-shield'></i>
                            </Link>
                        </Show>
                    </h4>
                    <Show when={userState.subscriptionKey.length > 0}>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>
                            {usageDetails.data?.airlakeApiRequestCount} / {pricingDetails.data?.[`${selectedPlan.toLowerCase()}SubscriptionConfig`]?.requestLimit?.airlake} Airlake API Requests used
                        </p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>
                            {usageDetails.data?.evolakeQueryCount} / {pricingDetails.data?.[`${selectedPlan.toLowerCase()}SubscriptionConfig`]?.requestLimit?.evolake} Evolake API Requests used
                        </p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>
                            {usageDetails.data?.frostlakeAnalyticsCount} / {pricingDetails.data?.[`${selectedPlan.toLowerCase()}SubscriptionConfig`]?.requestLimit?.frostlake} Frostlake API Requests used
                        </p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>
                            {usageDetails.data?.icelakeDocumentCount} / {pricingDetails.data?.[`${selectedPlan.toLowerCase()}SubscriptionConfig`]?.requestLimit?.icelake} Icelake API Requests used
                        </p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>
                            {usageDetails.data?.snowlakePrototypeCount} /{pricingDetails.data?.[`${selectedPlan.toLowerCase()}SubscriptionConfig`]?.requestLimit?.snowlake} Snowlake API Requests used
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