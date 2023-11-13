"use client"
import { Fragment, useContext, useState, useEffect } from "react"
import { Button, Col, Row } from "react-bootstrap"
import endPoints from "@/constants/apiEndpoints"
import { GlobalContext } from "@/context/globalStateProvider"
import axios from "axios"
import { toast } from "react-hot-toast"
import Constants from "@/constants/globalConstants"
import Web3 from "web3"
import Show from "@/components/Show"
import Loading from "@/components/Loading"
import useFetch from "@/hooks/useFetch"
import HTTPMethods from "@/constants/httpMethods"
import { AvatarIcon, BookmarkIcon, CopyIcon, ExitIcon } from "@radix-ui/react-icons"

export default function Page() {
  const [{ userState }] = useContext(GlobalContext)
  const contractAddress = useFetch("contract-address", endPoints.getSecretConfig, HTTPMethods.POST)
  const web3Provider = new Web3(`${endPoints.infuraEndpoint}/${contractAddress?.data?.infuraSecret}`)
  const [walletLoading, setWalletLoading] = useState(true)
  const [accountAddress, setAccountAddress] = useState("")
  const [maticBalance, setMaticBalance] = useState("0")

  useEffect(() => {
    (async () => {
      if (!contractAddress.isLoading) {
        try {
          const { privateKey } = userState
          const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
          setAccountAddress(walletAddress)
          const maticBalanceInWei = await web3Provider.eth.getBalance(walletAddress)
          const maticBalance = web3Provider.utils.fromWei(maticBalanceInWei, "ether")
          setMaticBalance(maticBalance)
        } catch (error) {
          toast.error(Constants.ErrorMessage)
        } finally {
          setWalletLoading(false)
        }
      }
    })()
  }, [userState, contractAddress.isLoading])

  const signOutFromAllDevices = async () => {
    try {
      await axios.post(endPoints.signOutEndpoint)
      localStorage.clear()
      window.location.replace("/")
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
        <div className="box">
          <p className="branding">Account</p>
          <Row className="mb-2 mt-4">
            <Col className="categorycol">
              <AvatarIcon />
            </Col>
            <Col>
              <p className="boxcategorytext">{userState.email}</p>
              <div className="boxcategorytext">
                Wallet Address {showWalletAddress(accountAddress)}<CopyIcon className="icon-right" onClick={copyWalletAddress} />
              </div>
            </Col>
          </Row>
          <Row className="mb-2 mt-4">
            <Col className="categorycol">
              <BookmarkIcon />
            </Col>
            <Col>
              <p className="boxcategorytext">Wallet Balance</p>
              <div className="boxcategorytext">
                {Number(maticBalance).toFixed(2)} MATIC
              </div>
            </Col>
          </Row>
          <Button className="btn-block" onClick={signOutFromAllDevices}>Sign out from all devices<ExitIcon className="icon-right" /></Button>
        </div>
      </Show>
    </Fragment >
  )
}
