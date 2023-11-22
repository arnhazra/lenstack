"use client"
import { Fragment, useContext, useState } from "react"
import { GlobalContext } from "@/context/globalstate.provider"
import Show from "@/components/show.component"
import { toast } from "react-hot-toast"
import { endPoints } from "@/constants/api.endpoints"
import HTTPMethods from "@/constants/http.methods"
import useFetch from "@/hooks/useFetch"
import Loading from "@/components/loading.component"
import moment from "moment"
import { Button, Col, Row } from "react-bootstrap"
import { LockOpen1Icon, CalendarIcon, CubeIcon, PieChartIcon, CopyIcon, ArrowRightIcon, StackIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import Web3 from "web3"
import axios from "axios"
import Constants from "@/constants/global.constants"
import useConfirm from "@/hooks/useConfirm"

export default function Page() {
  const { confirm, confirmDialog } = useConfirm()
  const web3Provider = new Web3(endPoints.signSubscriptionTxGateway)
  const [{ userState }, dispatch] = useContext(GlobalContext)
  const pricingDetails = useFetch("pricing", endPoints.getSubscriptionConfig, HTTPMethods.POST)
  const router = useRouter()
  const [selectedPlan] = useState("Pro")
  const [isTxProcessing, setTxProcessing] = useState(false)
  const [displayTrialButton, setDisplayTrialButton] = useState(userState.trialAvailable)
  const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(userState.privateKey)

  const showapiKey = (apiKey: string) => {
    const displayapiKey = `(${apiKey.substring(0, 3)}...${apiKey.substring(apiKey.length - 3)})`
    return displayapiKey
  }

  const copyapiKey = (): void => {
    navigator.clipboard.writeText(`${userState.apiKey}`)
    toast.success(Constants.CopiedToClipBoard)
  }

  const activateTrial = async () => {
    const userConsent = await confirm("Are you sure to activate Trial ?")

    if (userConsent) {
      try {
        await axios.post(endPoints.activateTrial)
        dispatch("setUserState", { refreshId: Math.random().toString(36).substring(7) })
        setDisplayTrialButton(false)
        toast.success(Constants.ToastSuccess)
      }

      catch (error) {
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
          to: Constants.LenstackNPAWalletAddress,
          value: web3Provider.utils.toWei(pricingDetails?.data?.pro?.price.toString(), "ether"),
          gas: 40000,
          gasPrice: gasPrice,
        }

        const signedApprovalTx = await web3Provider.eth.accounts.signTransaction(transactionObject, userState.privateKey)

        if (signedApprovalTx.rawTransaction) {
          const res = await web3Provider.eth.sendSignedTransaction(signedApprovalTx.rawTransaction)
          const { transactionHash } = res
          await axios.post(`${endPoints.subscribe}`, { selectedPlan, transactionHash })
          dispatch("setUserState", { refreshId: Math.random().toString(36).substring(7) })
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
      <Show when={!pricingDetails.isLoading}>
        <div className="box">
          <p className="branding">Subscribe & Usage</p>
          <p className="muted-text">Subscribe & Track your API Key usage from here</p>
          <Row className="mb-2 mt-4">
            <Col className="categorycol">
              <StackIcon />
            </Col>
            <Col>
              <p className="boxcategory-key">Workspace</p>
              <div className="boxcategory-value">
                {userState.selectedWorkspaceName}
              </div>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col className="categorycol">
              <CubeIcon />
            </Col>
            <Col>
              <p className="boxcategory-key">Selected Plan</p>
              <p className="boxcategory-value">
                {userState.selectedPlan}
              </p>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col className="categorycol">
              <LockOpen1Icon />
            </Col>
            <Col>
              <p className="boxcategory-key">API Key</p>
              <div className="boxcategory-value">
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
              <p className="boxcategory-key">Validity</p>
              <div className="boxcategory-value">
                <Show when={!!userState.apiKey}>
                  <p>Valid upto {moment(userState.expiresAt).format("MMM, Do YYYY")}</p>
                </Show>
                <Show when={!userState.apiKey}>
                  <p>No Validity Data</p>
                </Show>
              </div>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col className="categorycol">
              <PieChartIcon />
            </Col>
            <Col>
              <p className="boxcategory-key">Key Usage</p>
              <div className="boxcategory-value">
                <Show when={!!userState.apiKey}>
                  {userState.remainingCredits} / {pricingDetails.data?.[`${userState.selectedPlan.toLowerCase()}`]?.grantedCredits} Credits remaining
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
            <Show when={userState.selectedPlan === "" || userState.selectedPlan === "No Subscription" || userState.selectedPlan === "Trial" || (userState.selectedPlan === "Pro" && new Date() > new Date(userState.expiresAt))}>
              <Button className="btn-block" type="submit" disabled={isTxProcessing} onClick={activatePro}>
                <Show when={!isTxProcessing}>{userState.selectedPlan === "Pro" ? "Reactivate Pro" : "Activate Pro"} {pricingDetails.data?.pro?.price} MATIC<ArrowRightIcon className="icon-right" /></Show>
                <Show when={isTxProcessing}><i className="fas fa-circle-notch fa-spin"></i> Processing Payment</Show>
              </Button>
            </Show>
          </Fragment>
        </div>
      </Show>
      <Show when={pricingDetails.isLoading}>
        <Loading />
      </Show>
      {confirmDialog()}
    </Fragment >
  )
}