"use client"
import { Fragment, useContext, useState } from "react"
import { AppContext } from "@/_context/appStateProvider"
import Show from "@/_components/Show"
import { toast } from "react-hot-toast"
import useFetchRealtime from "@/_hooks/useFetchRealtime"
import endPoints from "@/_constants/apiEndpoints"
import HTTPMethods from "@/_constants/httpMethods"
import useFetch from "@/_hooks/useFetch"
import Loading from "@/_components/Loading"
import appConstants from "@/_constants/appConstants"
import moment from "moment"
import { Button, Col, Row } from "react-bootstrap"
import { LockOpen1Icon, CalendarIcon, BookmarkIcon, BarChartIcon, CopyIcon, ArrowRightIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import Web3 from "web3"
import axios from "axios"
import Constants from "@/_constants/appConstants"
import useConfirm from "@/_hooks/useConfirm"

export default function Page() {
  const { confirm, confirmDialog } = useConfirm()
  const contractAddress = useFetch("contract-address", endPoints.getSecretConfig, HTTPMethods.POST)
  const [{ userState }] = useContext(AppContext)
  const usageDetails = useFetchRealtime("usage", endPoints.getUsageByApiKeyEndpoint, HTTPMethods.POST)
  const pricingDetails = useFetch("pricing", endPoints.getSubscriptionConfigEndpoint, HTTPMethods.POST)
  const router = useRouter()
  const secretConfig = useFetch("secrets", endPoints.getSecretConfig, HTTPMethods.POST)
  const [selectedPlan] = useState("Pro")
  const web3Provider = new Web3(`${endPoints.infuraEndpoint}/${secretConfig?.data?.infuraApiKey}`)
  const [isTxProcessing, setTxProcessing] = useState(false)
  const [displayTrialButton, setDisplayTrialButton] = useState(userState.trialAvailable)
  const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(userState.privateKey)
  const usedCredits = usageDetails.data?.usedCredits > pricingDetails.data?.[`${userState.selectedPlan.toLowerCase()}SubscriptionConfig`]?.grantedCredits ? pricingDetails.data?.[`${userState.selectedPlan.toLowerCase()}SubscriptionConfig`]?.grantedCredits : usageDetails.data?.usedCredits

  const showapiKey = (apiKey: string) => {
    const displayapiKey = `(${apiKey.substring(0, 3)}...${apiKey.substring(apiKey.length - 3)})`
    return displayapiKey
  }

  const copyapiKey = (): void => {
    navigator.clipboard.writeText(`${userState.apiKey}`)
    toast.success(appConstants.CopiedToClipBoard)
  }

  const activateTrial = async () => {
    const userConsent = await confirm("Are you sure to activate Trial ?")

    if (userConsent) {
      try {
        await axios.post(endPoints.activateTrialEndpoint)
        setDisplayTrialButton(false)
        toast.success(Constants.ToastSuccess)
      } catch (error) {
        toast.error(Constants.ToastError)
      }
    }
  }

  const activatePro = async (e: any) => {
    e.preventDefault()
    const userConsent = await confirm("Are you sure to activate Pro with 1.99 MATIC ?")

    if (userConsent) {
      try {
        setTxProcessing(true)
        const gasPrice = await web3Provider.eth.getGasPrice()

        const transactionObject = {
          from: walletAddress,
          to: secretConfig?.data?.lenstackNpaWalletAddress,
          value: web3Provider.utils.toWei(pricingDetails?.data?.proSubscriptionConfig?.price.toString(), "ether"),
          gas: 40000,
          gasPrice: gasPrice,
        }

        const signedApprovalTx = await web3Provider.eth.accounts.signTransaction(transactionObject, userState.privateKey)

        if (signedApprovalTx.rawTransaction) {
          const res = await web3Provider.eth.sendSignedTransaction(signedApprovalTx.rawTransaction)
          const { transactionHash } = res
          await axios.post(`${endPoints.subscribeEndpoint}`, { selectedPlan, transactionHash })
          toast.success(Constants.TransactionSuccess)
        }

        else {
          toast.error(Constants.TransactionError)
        }
      }

      catch (error) {
        toast.error(Constants.TransactionError)
      }

      finally {
        setTxProcessing(false)
        router.refresh()
      }
    }
  }

  return (
    <Fragment>
      <Show when={!usageDetails.isLoading && !pricingDetails.isLoading && !contractAddress.isLoading}>
        <div className="box">
          <p className="branding">Subscribe & Usage</p>
          <p className="boxtext">Subscribe & Track your API Key usage from here</p>
          <Row className="mb-2 mt-4">
            <Col className="categorycol">
              <LockOpen1Icon />
            </Col>
            <Col>
              <p className="boxcategorytext">API Key</p>
              <div className="boxcategorytext">
                <Show when={!!userState.apiKey}>
                  {showapiKey(userState.apiKey)}<CopyIcon className="icon-right" onClick={copyapiKey} />
                </Show>
                <Show when={!userState.apiKey}>
                  No API Key
                </Show>
              </div>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col className="categorycol">
              <CalendarIcon />
            </Col>
            <Col>
              <p className="boxcategorytext">Validity</p>
              <div className="boxcategorytext">
                <Show when={!!userState.apiKey}>
                  <p>Valid upto {moment(userState.subscriptionValidUpto).format("MMM, Do YYYY")}</p>
                </Show>
                <Show when={!userState.apiKey}>
                  <p>No Validity Data</p>
                </Show>
              </div>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col className="categorycol">
              <BookmarkIcon />
            </Col>
            <Col>
              <p className="boxcategorytext">Selected Plan</p>
              <p className="boxcategorytext">
                {userState.selectedPlan}
              </p>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col className="categorycol">
              <BarChartIcon />
            </Col>
            <Col>
              <p className="boxcategorytext">Key Usage</p>
              <div className="boxcategorytext">
                <Show when={!!userState.apiKey}>
                  {usedCredits} / {pricingDetails.data?.[`${userState.selectedPlan.toLowerCase()}SubscriptionConfig`]?.grantedCredits} Credits used
                </Show>
                <Show when={!userState.apiKey}>
                  No API Key Usage Data
                </Show>
              </div>
            </Col>
          </Row>
          <Fragment>
            <Show when={displayTrialButton}>
              <Button className="btn-block" onClick={activateTrial}>Activate Trial<ArrowRightIcon className="icon-right" /></Button>
            </Show>
            <Show when={userState.selectedPlan !== "Pro"}>
              <Button className="btn-block" type="submit" disabled={isTxProcessing || userState.selectedPlan === "Pro"} onClick={activatePro}>
                <Show when={!isTxProcessing}>Activate Pro {pricingDetails.data?.proSubscriptionConfig?.price} MATIC<ArrowRightIcon className="icon-right" /></Show>
                <Show when={isTxProcessing}><i className="fas fa-circle-notch fa-spin"></i> Processing Payment</Show>
              </Button>
            </Show>
          </Fragment>
        </div>
      </Show>
      <Show when={usageDetails.isLoading || pricingDetails.isLoading || contractAddress.isLoading}>
        <Loading />
      </Show>
      {confirmDialog()}
    </Fragment >
  )
}