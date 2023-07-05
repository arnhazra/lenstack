import { Fragment, useContext, useEffect, useState } from 'react'
import endPoints from '@/constants/apiEndpoints'
import { AppContext } from '@/context/appStateProvider'
import { toast } from 'react-hot-toast'
import Constants from '@/constants/appConstants'
import Link from 'next/link'
import Web3 from 'web3'
import Show from '@/components/Show'
import Loading from '@/components/Loading'
import withAuth from '@/utils/withAuth'
import { NextPage } from 'next'
import appConstants from '@/constants/appConstants'

const WalletPage: NextPage = () => {
    const web3Provider = new Web3(endPoints.infuraEndpoint)
    const [walletLoading, setWalletLoading] = useState(true)
    const [accountAddress, setAccountAddress] = useState('')
    const [maticBalance, setMaticBalance] = useState('0')
    const [{ userState }] = useContext(AppContext)

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

    const showWalletAddress = (address: string) => {
        const displayAddress = `(${address.substring(0, 3)}...${address.substring(address.length - 3)})`
        return displayAddress
    }

    const copyWalletAddress = (): void => {
        navigator.clipboard.writeText(`${accountAddress}`)
        toast.success(appConstants.CopiedToClipBoard)
    }

    return (
        <Fragment>
            <Show when={walletLoading}>
                <Loading />
            </Show>
            <Show when={!walletLoading}>
                <div className='box'>
                    <p className='branding'>Wallet <i className='fa-solid fa-wallet'></i></p>
                    <p className='smalltext' title={accountAddress}>Wallet Address - {showWalletAddress(accountAddress)}<i className='fa-solid fa-copy' onClick={copyWalletAddress}></i></p>
                    <h4>
                        <i className='fa-brands fa-ethereum'></i>{Number(maticBalance).toFixed(2)} MATIC
                    </h4>
                    <Link className='btn btn-block' passHref href={'https://faucet.polygon.technology/'} target='_blank'>Fund my wallet<i className="fa-solid fa-square-arrow-up-right"></i></Link>
                </div>
            </Show>

        </Fragment >
    )
}

export default withAuth(WalletPage)