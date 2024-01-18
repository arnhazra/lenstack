"use client"
import { useContext, useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import { endPoints } from "@/constants/api-endpoints"
import { GlobalContext } from "@/context/globalstate.provider"
import axios from "axios"
import { toast } from "react-hot-toast"
import { uiConstants } from "@/constants/global-constants"
import Web3 from "web3"
import Suspense from "@/components/suspense"
import Loading from "@/components/loading"
import { AvatarIcon, BookmarkIcon, CubeIcon, ExitIcon } from "@radix-ui/react-icons"
import SensitiveInfoPanel from "@/components/sensitive-infopanel"
import InfoPanel from "@/components/infopanel"

export default function Page() {
  const [{ userState }] = useContext(GlobalContext)
  const web3Provider = new Web3(endPoints.infuraTransactionGateway)
  const [walletLoading, setWalletLoading] = useState<boolean>(true)
  const [accountAddress, setAccountAddress] = useState<string>("")
  const [maticBalance, setMaticBalance] = useState<string>("0")

  useEffect(() => {
    (async () => {
      try {
        const { privateKey } = userState
        const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
        setAccountAddress(walletAddress)
        const maticBalanceInWei = await web3Provider.eth.getBalance(walletAddress)
        const maticBalance = web3Provider.utils.fromWei(maticBalanceInWei, "ether")
        setMaticBalance(maticBalance)
      }

      catch (error) {
        toast.error(uiConstants.toastError)
      }

      finally {
        setWalletLoading(false)
      }
    })()
  }, [userState])

  const signOutFromAllDevices = async () => {
    try {
      await axios.post(endPoints.signOut)
      localStorage.clear()
      window.location.replace("/")
    }

    catch (error) {
      toast.error(uiConstants.toastError)
    }
  }

  const signOut = () => {
    try {
      localStorage.clear()
      window.location.replace("/")
    }

    catch (error) {
      toast.error(uiConstants.toastError)
    }
  }

  return (
    <Suspense condition={!walletLoading} fallback={<Loading />}>
      <div className="box">
        <p className="branding">Account</p>
        <InfoPanel infoIcon={<AvatarIcon />} infoName="Email Address" infoValue={userState.email} />
        <SensitiveInfoPanel credentialIcon={<CubeIcon />} credentialName="Wallet Address" credentialValue={accountAddress} />
        <InfoPanel infoIcon={<BookmarkIcon />} infoName="Wallet Balance" infoValue={`${Number(maticBalance).toFixed(2)} MATIC`} />
        <Button variant="secondary" className="btn-block" onClick={signOut}>Sign Out<ExitIcon className="icon-right" /></Button>
        <Button variant="primary" className="btn-block" onClick={signOutFromAllDevices}>Sign out from all devices<ExitIcon className="icon-right" /></Button>
      </div>
    </Suspense>
  )
}
