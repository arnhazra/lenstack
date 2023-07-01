import { Fragment, useContext, useState, useEffect } from 'react'
import { AppContext } from '@/context/appStateProvider'
import { SubReqLimitState } from '@/types/Types'
import Show from '@/components/Show'
import Link from 'next/link'
import contractAddress from '@/constants/contractAddress'
import { toast } from 'react-hot-toast'
import withAuth from '@/utils/withAuth'
import { NextPage } from 'next'

const UsagePage: NextPage = () => {
    const [{ userState, subReqLimitState }] = useContext(AppContext)
    const [tokenId, setTokenId] = useState('')
    const [maxLimit, setMaxLimit] = useState('0')
    const [selectedPlan, setSelectedPlan] = useState('Free')

    useEffect(() => {
        try {
            if (userState.subscriptionKey.length > 0) {
                setSelectedPlan(userState.subscriptionKey.split('_')[0])
                setTokenId(userState.subscriptionKey.split('_')[2])
            }

            else {
                setSelectedPlan('Free')
                setTokenId('')
            }
        } catch (error) {
            setSelectedPlan('Free')
            setTokenId('')
        }
    }, [userState.subscriptionKey])

    useEffect(() => {
        if (selectedPlan === 'Free') {
            setMaxLimit('0')
        }

        else {
            const subReqLimitStateKey = `${selectedPlan.toLowerCase()}SubscriptionReqLimit`
            setMaxLimit(subReqLimitState[subReqLimitStateKey as keyof SubReqLimitState])
        }
    }, [selectedPlan])

    const showSubscriptionKey = (subscriptionKey: string) => {
        const displaySubscriptionKey = `(${subscriptionKey.substring(0, 3)}...${subscriptionKey.substring(subscriptionKey.length - 3)})`
        return displaySubscriptionKey
    }

    const copySubscriptionKey = (): void => {
        navigator.clipboard.writeText(`${userState.subscriptionKey}`)
        toast.success('Copied to Clipboard')
    }

    return (
        <Fragment>
            <div className='box'>
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
                <h4>
                    {userState.subscriptionKeyUsage} / {maxLimit} API REQ USED
                </h4>
            </div>
        </Fragment >
    )
}

export default withAuth(UsagePage)