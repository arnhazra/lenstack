import { Button, ButtonGroup } from 'react-bootstrap'
import { Fragment, useContext, useEffect, useState } from 'react'
import { FC } from 'react'
import { AppContext } from '../context/appStateProvider'
import Show from '../components/Show'
import SubscribeModal from '../components/SubscribeModal'
import UnsubscribeModal from '../components/UnsubscribeModal'
import { SubPlanState } from '../types/Types'

const PricingPage: FC = () => {
    const [{ userState, subPlanState, subReqLimitState }] = useContext(AppContext)
    const [selectedPlan, setSelectedPlan] = useState('Standard')
    const [isSubscribeModalOpened, setSubscribeModalOpened] = useState(false)
    const [isUnsubscribeModalOpened, setUnsubscribeModalOpened] = useState(false)
    const [planPrice, setPlanPrice] = useState('')
    const [tokenId, setTokenId] = useState(userState.subscriptionKey.split('_')[2] || '')

    useEffect(() => {
        try {
            setTokenId(userState.subscriptionKey.split('_')[2])
        } catch (error) {
            setTokenId('')
        }
    }, [userState.subscriptionKey])

    const hideSubscribeModal = () => {
        setSubscribeModalOpened(false)
    }

    const hideUnsubscribeModal = () => {
        setUnsubscribeModalOpened(false)
    }

    useEffect(() => {
        const planPriceKey = `${selectedPlan.toLocaleLowerCase()}SubscriptionPrice`
        const selectedPlanPrice = subPlanState[planPriceKey as keyof SubPlanState]
        setPlanPrice(selectedPlanPrice)
    }, [selectedPlan])

    return (
        <Fragment>
            <div className='bigbox'>
                <p className='branding'>Pricing<i className="fa-solid fa-money-check-dollar"></i></p>
                <ButtonGroup className='btn-group-card'>
                    <Button className={selectedPlan === 'Standard' ? 'btn-grp-btn-sel' : 'btn-grp-btn'} onClick={(): void => setSelectedPlan('Standard')}>STANDARD</Button>
                    <Button className={selectedPlan === 'Premium' ? 'btn-grp-btn-sel' : 'btn-grp-btn'} onClick={(): void => setSelectedPlan('Premium')}>PREMIUM</Button>
                </ButtonGroup>
                <div className='plans mt-2'>
                    <Show when={selectedPlan === 'Standard'}>
                        <p className='branding text-center'><i className='fa-brands fa-ethereum'></i>{subPlanState.standardSubscriptionPrice} MATIC</p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>Davinci Model</p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>Database Queries</p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>{subReqLimitState.standardSubscriptionReqLimit} API requests</p>
                        <Button className='btn-block' onClick={() => setSubscribeModalOpened(true)}>Pay & Subscribe<i className="fa-solid fa-lock"></i></Button>
                    </Show>
                    <Show when={selectedPlan === 'Premium'}>
                        <p className='branding text-center'><i className='fa-brands fa-ethereum'></i>{subPlanState.premiumSubscriptionPrice} MATIC</p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>Davinci Model</p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>Database Queries</p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>{subReqLimitState.premiumSubscriptionReqLimit} API requests</p>
                        <Button className='btn-block' onClick={() => setSubscribeModalOpened(true)}>Pay & Subscribe<i className="fa-solid fa-lock"></i></Button>
                    </Show>
                </div>
                <Show when={tokenId?.length > 0}>
                    <p className="lead-link" onClick={() => setUnsubscribeModalOpened(true)}>Unsubscribe & Refund</p>
                </Show>
            </div>
            <SubscribeModal price={Number(planPrice) * 10000} isOpened={isSubscribeModalOpened} closeModal={() => { hideSubscribeModal() }} selectedPlan={selectedPlan} />
            <UnsubscribeModal tokenId={tokenId} refundAmount={Number(0.2) * 5000} isOpened={isUnsubscribeModalOpened} closeModal={() => { hideUnsubscribeModal() }} />
        </Fragment>
    )
}

export default PricingPage