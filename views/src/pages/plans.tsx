import { Button, ButtonGroup } from 'react-bootstrap'
import { Fragment, useState } from 'react'
import { NextPage } from 'next'
import Show from '@/components/Show'

const PlansPage: NextPage = () => {
    const [selectedPlan, setSelectedPlan] = useState('Standard')

    return (
        <Fragment>
            <div className='box'>
                <p className='branding'>Plans<i className="fa-solid fa-money-check-dollar"></i></p>
                <p>Choose your plan</p>
                <ButtonGroup className='btn-group-card'>
                    <Button className={selectedPlan === 'Standard' ? 'btn-grp-btn-sel' : 'btn-grp-btn'} onClick={(): void => setSelectedPlan('Standard')}>STANDARD</Button>
                    <Button className={selectedPlan === 'Premium' ? 'btn-grp-btn-sel' : 'btn-grp-btn'} onClick={(): void => setSelectedPlan('Premium')}>PREMIUM</Button>
                </ButtonGroup>
                <div className='plans mt-2'>
                    <Show when={selectedPlan === 'Standard'}>
                        <p className='branding text-center'><i className='fa-brands fa-ethereum'></i>0.19 MATIC</p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>Davinci Model</p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>Database Queries</p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>30 API requests</p>
                    </Show>
                    <Show when={selectedPlan === 'Premium'}>
                        <p className='branding text-center'><i className='fa-brands fa-ethereum'></i>0.49 MATIC</p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>Davinci Model</p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>Database Queries</p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>100 API requests</p>
                    </Show>
                </div>
            </div>
        </Fragment>
    )
}

export default PlansPage