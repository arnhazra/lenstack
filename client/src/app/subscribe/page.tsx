"use client"
import { Button, ButtonGroup } from 'react-bootstrap'
import { Fragment, useContext, useEffect, useState } from 'react'
import { AppContext } from '@/context/appStateProvider'
import Show from '@/components/Show'
import SubscribeModal from '@/components/SubscribeModal'
import UnsubscribeModal from '@/components/UnsubscribeModal'
import withAuth from '@/utils/withAuth'
import { NextPage } from 'next'
import useFetch from '@/hooks/useFetch'
import endPoints from '@/constants/apiEndpoints'
import HTTPMethods from '@/constants/httpMethods'
import Loading from '@/components/Loading'

const SubscribePage: NextPage = () => {
    const [{ userState }] = useContext(AppContext)
    const pricingDetails = useFetch('pricing', endPoints.getSubscriptionAndCostConfigEndpoint, HTTPMethods.POST)
    const [selectedPlan, setSelectedPlan] = useState('Standard')
    const [isSubscribeModalOpened, setSubscribeModalOpened] = useState(false)
    const [isUnsubscribeModalOpened, setUnsubscribeModalOpened] = useState(false)
    const [planPrice, setPlanPrice] = useState('')

    useEffect(() => {
        if (selectedPlan === 'Standard') {
            setPlanPrice(pricingDetails.data?.subscriptionConfig?.standardSubscriptionConfig?.price)
        }

        if (selectedPlan === 'Premium') {
            setPlanPrice(pricingDetails.data?.subscriptionConfig?.premiumSubscriptionConfig?.price)
        }
    }, [selectedPlan, pricingDetails.data])

    const hideSubscribeModal = () => {
        setSubscribeModalOpened(false)
    }

    const hideUnsubscribeModal = () => {
        setUnsubscribeModalOpened(false)
    }

    return (
        <Fragment>
            <Show when={!pricingDetails.isLoading}>
                <div className='box'>
                    <p className='branding'>Subscribe<i className='fa-solid fa-money-check-dollar'></i></p>
                    <ButtonGroup className='btn-group-card'>
                        <Button className={selectedPlan === 'Standard' ? 'btn-grp-btn-sel' : 'btn-grp-btn'} onClick={(): void => setSelectedPlan('Standard')}>STANDARD</Button>
                        <Button className={selectedPlan === 'Premium' ? 'btn-grp-btn-sel' : 'btn-grp-btn'} onClick={(): void => setSelectedPlan('Premium')}>PREMIUM</Button>
                    </ButtonGroup>
                    <div className='plans mt-2'>
                        <Show when={selectedPlan === 'Standard'}>
                            <p className='text-center'><i className='fa-brands fa-ethereum'></i>{planPrice} MATIC/month</p>
                            <p className='branding text-center'>{pricingDetails.data?.subscriptionConfig?.standardSubscriptionConfig?.grantedCredits} CREDITS</p>
                            <p className='lead'><i className='fa-solid fa-star'></i>{pricingDetails.data?.creditsCostConfig?.airlake} / Airlake API Requests</p>
                            <p className='lead'><i className='fa-solid fa-star'></i>{pricingDetails.data?.creditsCostConfig?.evolake} / Evolake API Requests</p>
                            <p className='lead'><i className='fa-solid fa-star'></i>{pricingDetails.data?.creditsCostConfig?.icelake} / Icelake API Requests</p>
                            <p className='lead'><i className='fa-solid fa-star'></i>{pricingDetails.data?.creditsCostConfig?.snowlake} / Snowlake API Requests</p>
                            <p className='lead'><i className='fa-solid fa-star'></i>{pricingDetails.data?.creditsCostConfig?.frostlake} / Frostlake API Requests</p>
                            <Button className='btn-block' disabled={!!userState.apiKey} onClick={() => setSubscribeModalOpened(true)}>Pay & Subscribe<i className='fa-solid fa-circle-plus'></i></Button>
                        </Show>
                        <Show when={selectedPlan === 'Premium'}>
                            <p className='text-center'><i className='fa-brands fa-ethereum'></i>{planPrice} MATIC/month</p>
                            <p className='branding text-center'>{pricingDetails.data?.subscriptionConfig?.premiumSubscriptionConfig?.grantedCredits} CREDITS</p>
                            <p className='lead'><i className='fa-solid fa-star'></i>{pricingDetails.data?.creditsCostConfig?.airlake} / Airlake API Requests</p>
                            <p className='lead'><i className='fa-solid fa-star'></i>{pricingDetails.data?.creditsCostConfig?.evolake} / Evolake API Requests</p>
                            <p className='lead'><i className='fa-solid fa-star'></i>{pricingDetails.data?.creditsCostConfig?.icelake} / Icelake API Requests</p>
                            <p className='lead'><i className='fa-solid fa-star'></i>{pricingDetails.data?.creditsCostConfig?.snowlake} / Snowlake API Requests</p>
                            <p className='lead'><i className='fa-solid fa-star'></i>{pricingDetails.data?.creditsCostConfig?.frostlake} / Frostlake API Requests</p>
                            <Button className='btn-block' disabled={!!userState.apiKey} onClick={() => setSubscribeModalOpened(true)}>Pay & Subscribe<i className='fa-solid fa-circle-plus'></i></Button>
                        </Show>
                    </div>
                    <Show when={!!userState.apiKey}>
                        <p className='lead-link' onClick={() => setUnsubscribeModalOpened(true)}>Cancel Subscription</p>
                    </Show>
                </div>
                <SubscribeModal price={Number(planPrice) * 10000} isOpened={isSubscribeModalOpened} closeModal={() => { hideSubscribeModal() }} selectedPlan={selectedPlan} />
                <UnsubscribeModal tokenId={userState.tokenId} refundAmount={Number(0.2) * 5000} isOpened={isUnsubscribeModalOpened} closeModal={() => { hideUnsubscribeModal() }} />
            </Show>
            <Show when={pricingDetails.isLoading}>
                <Loading />
            </Show>
        </Fragment>
    )
}

export default withAuth(SubscribePage)