"use client"
import { Fragment, useContext } from 'react'
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

const UsagePage: NextPage = () => {
    const contractAddress = useFetch('getsecrets', endPoints.getSecrets, HTTPMethods.POST)
    const [{ userState }] = useContext(AppContext)
    const usageDetails = useFetchRealtime('usage', endPoints.getUsageByApiKeyEndpoint, HTTPMethods.POST)

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
            <Show when={!usageDetails.isLoading && !contractAddress.isLoading}>
                <div className='box'>
                    <p className='branding'>Usage<i className='fa-solid fa-chart-pie'></i></p>
                    <Show when={userState.apiKey.length > 0}>
                        <p className='smalltext' title={userState.apiKey}>API Key - {showapiKey(userState.apiKey)}<i className='fa-solid fa-copy' onClick={copyapiKey}></i></p>
                        <p className='smalltext'>Valid upto {moment(userState.subscriptionValidUpto).format('MMM, Do YYYY')}</p>
                    </Show>
                    <h4>
                        Plan - {userState.selectedPlan}
                        <Show when={userState.apiKey.length > 0}>
                            <Link title='Access NFT' target='_blank' passHref href={`https://mumbai.polygonscan.com/token/${contractAddress?.data?.nftContractAddress}?a=${userState.tokenId}`}>
                                <img src='https://cdn-icons-png.flaticon.com/128/6298/6298900.png' height={40} width={40}></img>
                            </Link>
                        </Show>
                    </h4>
                    <Show when={userState.apiKey.length > 0}>
                        <p className='lead'><i className='fa-solid fa-star'></i>
                            {usageDetails.data?.availableCredits}
                        </p>
                    </Show>
                </div>
            </Show>
            <Show when={usageDetails.isLoading || contractAddress.isLoading}>
                <Loading />
            </Show>
        </Fragment >
    )
}

export default withAuth(UsagePage)