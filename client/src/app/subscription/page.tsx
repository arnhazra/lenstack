"use client"
import { Fragment, useContext, useState } from "react"
import { GlobalContext } from "@/context/globalstate.provider"
import Show from "@/components/show.component"
import { toast } from "react-hot-toast"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useFetch from "@/hooks/useFetch"
import Loading from "@/components/loading.component"
import moment from "moment"
import { Button } from "react-bootstrap"
import { CalendarIcon, CubeIcon, PieChartIcon, ArrowRightIcon, StackIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import Web3 from "web3"
import axios from "axios"
import { uiConstants } from "@/constants/global-constants"
import useConfirm from "@/hooks/useConfirm"
import InfoPanel from "@/components/infopanel.component"

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

  const activateTrial = async () => {
    const userConsent = await confirm("Are you sure to activate Trial ?")

    if (userConsent) {
      try {
        await axios.post(endPoints.activateTrial)
        dispatch("setUserState", { refreshId: Math.random().toString(36).substring(7) })
        setDisplayTrialButton(false)
        toast.success(uiConstants.toastSuccess)
      }

      catch (error) {
        toast.error(uiConstants.toastError)
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
          to: uiConstants.npaWalletAddress,
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
          toast.success(uiConstants.transactionSuccess)
        }

        else {
          toast.error(uiConstants.transactionError)
        }
      }

      catch (error) {
        toast.error(uiConstants.transactionError)
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
          <p className="muted-text mb-4">Subscribe & Track your API Credentials usage from here</p>
          <InfoPanel infoIcon={<StackIcon />} infoName="Workspace" infoValue={userState.selectedWorkspaceName} />
          <InfoPanel infoIcon={<CubeIcon />} infoName="Selected Plan" infoValue={userState.selectedPlan} />
          <InfoPanel infoIcon={<CalendarIcon />} infoName="Validity" infoValue={userState.hasActiveSubscription ? `Valid upto ${moment(userState.expiresAt).format("MMM, Do YYYY")}` : "No Validity Data"} />
          <InfoPanel infoIcon={<PieChartIcon />} infoName="Subscription Usage" infoValue={userState.hasActiveSubscription ? `${userState.remainingCredits} / ${pricingDetails.data?.[`${userState.selectedPlan.toLowerCase()}`]?.grantedCredits} Credits remaining` : "No Subscriptions Usage Data"} />
          <Fragment>
            <Show when={displayTrialButton && !userState.hasActiveSubscription}>
              <Button variant="primary" className="btn-block" onClick={activateTrial}>Activate Trial<ArrowRightIcon className="icon-right" /></Button>
            </Show>
            <Show when={!userState.hasActiveSubscription}>
              <Button variant="primary" className="btn-block" type="submit" disabled={isTxProcessing} onClick={activatePro}>
                <Show when={!isTxProcessing}>Activate Pro {pricingDetails.data?.pro?.price} MATIC<ArrowRightIcon className="icon-right" /></Show>
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