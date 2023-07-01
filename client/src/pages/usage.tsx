import { Fragment, useContext, useState, useEffect } from 'react'
import { AppContext } from '@/context/appStateProvider'
import Show from '@/components/Show'
import Link from 'next/link'
import contractAddress from '@/constants/contractAddress'
import { toast } from 'react-hot-toast'
import withAuth from '@/utils/withAuth'
import { NextPage } from 'next'

const UsagePage: NextPage = () => {
    const [{ userState }] = useContext(AppContext)
    const [tokenId, setTokenId] = useState('')
    const [maxLimit, setMaxLimit] = useState('0')
    const [selectedPlan, setSelectedPlan] = useState('No Subscription')

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
                <Show when={userState.subscriptionKey.length > 0}>
                    hello
                </Show>
            </div>
        </Fragment >
    )
}

export default withAuth(UsagePage)