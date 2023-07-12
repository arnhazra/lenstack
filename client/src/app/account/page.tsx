"use client"
import { Fragment, useContext, useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import endPoints from '@/constants/apiEndpoints'
import { useRouter } from 'next/navigation'
import { AppContext } from '@/context/appStateProvider'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Constants from '@/constants/appConstants'
import withAuth from '@/utils/withAuth'
import { NextPage } from 'next'
import Web3 from 'web3'
import Show from '@/components/Show'
import Loading from '@/components/Loading'
import Link from 'next/link'

const AccountPage: NextPage = () => {
    const [{ userState }] = useContext(AppContext)
    const web3Provider = new Web3(endPoints.infuraEndpoint)
    const [walletLoading, setWalletLoading] = useState(true)
    const [accountAddress, setAccountAddress] = useState('')
    const [maticBalance, setMaticBalance] = useState('0')
    const router = useRouter()

    useEffect(() => {
        (async () => {
            try {
                const { privateKey } = userState
                const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
                setAccountAddress(walletAddress)
                const maticBalanceInWei = await web3Provider.eth.getBalance(walletAddress)
                const maticBalance = web3Provider.utils.fromWei(maticBalanceInWei, 'ether')
                setMaticBalance(maticBalance)
                setWalletLoading(false)
            } catch (error) {
                setWalletLoading(false)
                toast.error(Constants.ErrorMessage)
            }
        })()
    }, [userState])

    const signOutFromThisDevice = () => {
        localStorage.removeItem('accessToken')
        router.push('/')
    }

    const signOutFromAllDevices = async () => {
        try {
            await axios.post(endPoints.signOutEndpoint)
            localStorage.removeItem('accessToken')
            router.push('/')
        } catch (error) {
            toast.error(Constants.ToastError)
        }
    }

    const showWalletAddress = (address: string) => {
        const displayAddress = `(${address.substring(0, 3)}...${address.substring(address.length - 3)})`
        return displayAddress
    }

    const copyWalletAddress = (): void => {
        navigator.clipboard.writeText(`${accountAddress}`)
        toast.success(Constants.CopiedToClipBoard)
    }

    return (
        <Fragment>
            <Show when={walletLoading}>
                <Loading />
            </Show>
            <Show when={!walletLoading}>
                <div className='box'>
                    <p className='branding'>Account <i className='fa-solid fa-address-card'></i></p>
                    <h4 className='text-center'>Hello, {userState.name.split(' ')[0]}</h4>
                    <p className='lead pt-2 text-center' title={accountAddress}>Wallet Address - {showWalletAddress(accountAddress)}<i className='fa-solid fa-copy' onClick={copyWalletAddress}></i></p>
                    <h2 className='pb-3 text-center color-amount'>
                        <i className='fa-brands fa-ethereum'></i>{Number(maticBalance).toFixed(2)} MATIC
                    </h2>
                    <Link className='btn btn-block' passHref href={'https://faucet.polygon.technology/'} target='_blank'>Fund my wallet<i className='fa-solid fa-square-arrow-up-right'></i></Link>
                    <Button className='btn-block mb-4' onClick={signOutFromThisDevice}>Sign Out<i className='fa-solid fa-circle-arrow-right'></i></Button>
                    <p className='lead-link text-center' onClick={signOutFromAllDevices}>Sign out from all devices</p>
                </div>
            </Show>
        </Fragment >
    )
}

export default withAuth(AccountPage)