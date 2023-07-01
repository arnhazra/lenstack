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

const PricingPage: NextPage = () => {
    const [{ userState }] = useContext(AppContext)
    const pricingDetails = useFetch('pricing', endPoints.getSubscriptionConfigEndpoint, HTTPMethods.POST, {})
    const [selectedPlan, setSelectedPlan] = useState('Standard')
    const [isSubscribeModalOpened, setSubscribeModalOpened] = useState(false)
    const [isUnsubscribeModalOpened, setUnsubscribeModalOpened] = useState(false)
    const [planPrice, setPlanPrice] = useState('')
    const [tokenId, setTokenId] = useState(userState.subscriptionKey.split('-')[2] || '')

    useEffect(() => {
        try {
            setTokenId(userState.subscriptionKey.split('-')[2])
        } catch (error) {
            setTokenId('')
        }
    }, [userState.subscriptionKey])

    useEffect(() => {
        if (selectedPlan === 'Standard') {
            setPlanPrice(pricingDetails.data?.standardSubscriptionConfig?.price)
        }

        if (selectedPlan === 'Premium') {
            setPlanPrice(pricingDetails.data?.premiumSubscriptionConfig?.price)
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
                    <p className='branding'>Pricing<i className="fa-solid fa-money-check-dollar"></i></p>
                    <ButtonGroup className='btn-group-card'>
                        <Button className={selectedPlan === 'Standard' ? 'btn-grp-btn-sel' : 'btn-grp-btn'} onClick={(): void => setSelectedPlan('Standard')}>STANDARD</Button>
                        <Button className={selectedPlan === 'Premium' ? 'btn-grp-btn-sel' : 'btn-grp-btn'} onClick={(): void => setSelectedPlan('Premium')}>PREMIUM</Button>
                    </ButtonGroup>
                    <div className='plans mt-2'>
                        <Show when={selectedPlan === 'Standard'}>
                            <p className='branding text-center'><i className='fa-brands fa-ethereum'></i>{pricingDetails.data?.standardSubscriptionConfig?.price} MATIC</p>
                            <p className='lead'><i className='fa-solid fa-circle-check'></i>{pricingDetails.data?.standardSubscriptionConfig?.requestLimit?.airlake} Airlake API Requests</p>
                            <p className='lead'><i className='fa-solid fa-circle-check'></i>{pricingDetails.data?.standardSubscriptionConfig?.requestLimit?.evolake} Evolake API Requests</p>
                            <p className='lead'><i className='fa-solid fa-circle-check'></i>{pricingDetails.data?.standardSubscriptionConfig?.requestLimit?.frostlake} Frostlake API Requests</p>
                            <p className='lead'><i className='fa-solid fa-circle-check'></i>{pricingDetails.data?.standardSubscriptionConfig?.requestLimit?.icelake} Icelake API Requests</p>
                            <p className='lead'><i className='fa-solid fa-circle-check'></i>{pricingDetails.data?.standardSubscriptionConfig?.requestLimit?.snowlake} Snowlake API Requests</p>
                            <Button className='btn-block' onClick={() => setSubscribeModalOpened(true)}>Pay & Subscribe<i className="fa-solid fa-lock"></i></Button>
                        </Show>
                        <Show when={selectedPlan === 'Premium'}>
                            <p className='branding text-center'><i className='fa-brands fa-ethereum'></i>{pricingDetails.data?.premiumSubscriptionConfig?.price} MATIC</p>
                            <p className='lead'><i className='fa-solid fa-circle-check'></i>{pricingDetails.data?.premiumSubscriptionConfig?.requestLimit?.airlake} Airlake API Requests</p>
                            <p className='lead'><i className='fa-solid fa-circle-check'></i>{pricingDetails.data?.premiumSubscriptionConfig?.requestLimit?.evolake} Evolake API Requests</p>
                            <p className='lead'><i className='fa-solid fa-circle-check'></i>{pricingDetails.data?.premiumSubscriptionConfig?.requestLimit?.frostlake} Frostlake API Requests</p>
                            <p className='lead'><i className='fa-solid fa-circle-check'></i>{pricingDetails.data?.premiumSubscriptionConfig?.requestLimit?.icelake} Icelake API Requests</p>
                            <p className='lead'><i className='fa-solid fa-circle-check'></i>{pricingDetails.data?.premiumSubscriptionConfig?.requestLimit?.snowlake} Snowlake API Requests</p>
                            <Button className='btn-block' onClick={() => setSubscribeModalOpened(true)}>Pay & Subscribe<i className="fa-solid fa-lock"></i></Button>
                        </Show>
                    </div>
                    <Show when={tokenId?.length > 0}>
                        <p className="lead-link" onClick={() => setUnsubscribeModalOpened(true)}>Unsubscribe & Refund</p>
                    </Show>
                </div>
                <SubscribeModal price={Number(planPrice) * 10000} isOpened={isSubscribeModalOpened} closeModal={() => { hideSubscribeModal() }} selectedPlan={selectedPlan} />
                <UnsubscribeModal tokenId={tokenId} refundAmount={Number(0.2) * 5000} isOpened={isUnsubscribeModalOpened} closeModal={() => { hideUnsubscribeModal() }} />
            </Show>
            <Show when={pricingDetails.isLoading}>
                <Loading />
            </Show>
        </Fragment>
    )
}

export default withAuth(PricingPage)