import { Button, ButtonGroup } from 'react-bootstrap'
import { Fragment, useState } from 'react'
import Show from '@/components/Show'
import { NextPage } from 'next'
import useFetch from '@/hooks/useFetch'
import endPoints from '@/constants/apiEndpoints'
import HTTPMethods from '@/constants/httpMethods'
import Loading from '@/components/Loading'
import withoutAuth from '@/utils/withoutAuth'

const PlansPage: NextPage = () => {
    const pricingDetails = useFetch('pricing', endPoints.getSubscriptionConfigEndpoint, HTTPMethods.POST)
    const [selectedPlan, setSelectedPlan] = useState('Standard')

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
                            <p className='branding text-center'><i className='fa-brands fa-ethereum'></i>{pricingDetails.data?.standardSubscriptionConfig?.price} MATIC/month</p>
                            <p className='lead'><i className='fa-solid fa-star'></i>{pricingDetails.data?.standardSubscriptionConfig?.requestLimit?.airlake} Airlake API Requests</p>
                            <p className='lead'><i className='fa-solid fa-star'></i>{pricingDetails.data?.standardSubscriptionConfig?.requestLimit?.evolake} Evolake API Requests</p>
                            <p className='lead'><i className='fa-solid fa-star'></i>{pricingDetails.data?.standardSubscriptionConfig?.requestLimit?.icelake} Icelake API Requests</p>
                            <p className='lead'><i className='fa-solid fa-star'></i>{pricingDetails.data?.standardSubscriptionConfig?.requestLimit?.snowlake} Snowlake API Requests</p>
                        </Show>
                        <Show when={selectedPlan === 'Premium'}>
                            <p className='branding text-center'><i className='fa-brands fa-ethereum'></i>{pricingDetails.data?.premiumSubscriptionConfig?.price} MATIC/month</p>
                            <p className='lead'><i className='fa-solid fa-star'></i>{pricingDetails.data?.premiumSubscriptionConfig?.requestLimit?.airlake} Airlake API Requests</p>
                            <p className='lead'><i className='fa-solid fa-star'></i>{pricingDetails.data?.premiumSubscriptionConfig?.requestLimit?.evolake} Evolake API Requests</p>
                            <p className='lead'><i className='fa-solid fa-star'></i>{pricingDetails.data?.premiumSubscriptionConfig?.requestLimit?.icelake} Icelake API Requests</p>
                            <p className='lead'><i className='fa-solid fa-star'></i>{pricingDetails.data?.premiumSubscriptionConfig?.requestLimit?.snowlake} Snowlake API Requests</p>
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

export default withoutAuth(PlansPage)