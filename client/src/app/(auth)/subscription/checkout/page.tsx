"use client"
import { useContext, useState } from "react"
import { GlobalContext } from "@/context/globalstate.provider"
import Suspense from "@/components/suspense"
import { toast } from "react-hot-toast"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import Loading from "@/components/loading"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { useRouter, useSearchParams } from "next/navigation"
import Web3 from "web3"
import axios from "axios"
import { uiConstants } from "@/constants/global-constants"
import Error from "@/components/error"
import { Button } from "react-bootstrap"

export default function Page() {
  const [allPlans] = useState<string[]>(["basic", "standard", "premium"])
  const pricingDetails = useQuery(["pricing"], endPoints.getSubscriptionConfig, HTTPMethods.GET)
  const [{ userState }, dispatch] = useContext(GlobalContext)
  const searchParams = useSearchParams()
  const planName = searchParams.get("planName")
  const plan = pricingDetails?.data?.find((pricing: any) => pricing.planName === planName)
  const [planNotFoundError] = useState<boolean>(allPlans.find(plan => plan === planName) === undefined)

  const [isTxProcessing, setTxProcessing] = useState(false)
  const router = useRouter()
  const [selectedGateway, setSelectedGateway] = useState("alchemy")

  const activate = async (e: any) => {
    e.preventDefault()

    try {
      setTxProcessing(true)
      const web3Provider = new Web3(endPoints.infuraTransactionGateway)
      const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(userState.privateKey)
      const gasPrice = await web3Provider.eth.getGasPrice()

      const transactionObject = {
        from: walletAddress,
        to: uiConstants.npaWalletAddress,
        value: web3Provider.utils.toWei(plan?.price.toString(), "ether"),
        gas: 40000,
        gasPrice: gasPrice,
      }

      const signedApprovalTx = await web3Provider.eth.accounts.signTransaction(transactionObject, userState.privateKey)

      if (signedApprovalTx.rawTransaction) {
        const res = await web3Provider.eth.sendSignedTransaction(signedApprovalTx.rawTransaction)
        const { transactionHash } = res
        await axios.post(`${endPoints.subscribe}`, { selectedPlan: planName, transactionHash })
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

  return (
    <Suspense condition={!pricingDetails.isLoading} fallback={<Loading />}>
      <Suspense condition={!pricingDetails.error && !planNotFoundError} fallback={<Error />}>
        <div className="box">
          <p className="branding">Checkout</p>
          <p className="lead text-capitalize">{plan?.planName} Plan</p>
          <h2>{plan?.price} MATIC</h2>
          <h5 className="mb-3 mt-3">{Number(plan?.grantedCredits).toLocaleString()} Credits</h5>
          <p className="text-secondary">Select Transaction Gateway</p>
          <div className="mt-2 mb-4">
            <input type="radio" checked={selectedGateway === "alchemy"} name="gateway" value="alchemy" onChange={(e) => setSelectedGateway(e.target.value)} />
            <label htmlFor="alchemy">Alchemy</label><br />
            <input type="radio" checked={selectedGateway === "infura"} name="gateway" value="infura" onChange={(e) => setSelectedGateway(e.target.value)} />
            <label htmlFor="infura">Infura</label><br />
            <input type="radio" checked={selectedGateway === "quicknode"} name="gateway" value="quicknode" onChange={(e) => setSelectedGateway(e.target.value)} />
            <label htmlFor="quicknode">Quicknode</label>
          </div>
          <Button disabled={userState.hasActiveSubscription} variant="primary" className="btn-block" onClick={activate}>
            <Suspense condition={!isTxProcessing} fallback={<><i className="fas fa-circle-notch fa-spin"></i> Activating Plan</>}>
              Activate Plan<ArrowRightIcon className="icon-right" />
            </Suspense>
          </Button>
        </div>
      </Suspense>
    </Suspense>
  )
}