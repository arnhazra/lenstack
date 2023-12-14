"use client"
import { Fragment, useContext, useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import { endPoints } from "@/constants/api-endpoints"
import { GlobalContext } from "@/context/globalstate.provider"
import axios from "axios"
import { toast } from "react-hot-toast"
import { uiConstants } from "@/constants/global-constants"
import Web3 from "web3"
import Show from "@/components/show-component"
import Loading from "@/components/loading-component"
import { AvatarIcon, BookmarkIcon, ExitIcon } from "@radix-ui/react-icons"
import SensitiveInfoPanel from "@/components/sensitiveinfopanel-component"
import InfoPanel from "@/components/infopanel-component"

export default function Page() {
  const [{ userState }] = useContext(GlobalContext)
  const web3Provider = new Web3(endPoints.signAccountTxGateway)
  const [walletLoading, setWalletLoading] = useState(true)
  const [accountAddress, setAccountAddress] = useState("")
  const [maticBalance, setMaticBalance] = useState("0")

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
    <Fragment>
      <Show when={walletLoading}>
        <Loading />
      </Show>
      <Show when={!walletLoading}>
        <div className="box">
          <p className="branding">Account</p>
          <SensitiveInfoPanel credentialIcon={<AvatarIcon />} credentialName={userState.email} credentialValue={accountAddress} />
          <InfoPanel infoIcon={<BookmarkIcon />} infoName="Wallet Balance" infoValue={`${Number(maticBalance).toFixed(2)} MATIC`} />
          <Button variant="primary" className="btn-block" onClick={signOut}>Sign Out<ExitIcon className="icon-right" /></Button>
          <button className="btn btn-block btn-secondary" onClick={signOutFromAllDevices}>Sign out from all devices<ExitIcon className="icon-right" /></button>
        </div>
      </Show>
    </Fragment >
  )
}
