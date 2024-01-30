"use client"
import { useCallback, useContext, useEffect, useState } from "react"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import Suspense from "@/components/suspense"
import { toast } from "react-hot-toast"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import Loading from "@/components/loading"
import { CheckCircledIcon, LockClosedIcon, PaperPlaneIcon } from "@radix-ui/react-icons"
import { useRouter, useSearchParams } from "next/navigation"
import Web3 from "web3"
import axios from "axios"
import { uiConstants } from "@/constants/global-constants"
import Error from "@/components/error"
import { Badge, Button, Row } from "react-bootstrap"
import Option from "@/components/option"
import InfoPanel from "@/components/infopanel"

export default function Page() {
  const [allPlans] = useState<string[]>(["starter", "premium", "ultra"])
  const pricingDetails = useQuery(["pricing"], endPoints.getSubscriptionConfig, HTTPMethods.GET)
  const [{ userState }, dispatch] = useContext(GlobalContext)
  const searchParams = useSearchParams()
  const planName = searchParams.get("planName")
  const plan = pricingDetails?.data?.find((pricing: any) => pricing.planName === planName)
  const [planNotFoundError] = useState<boolean>(allPlans.find(plan => plan === planName) === undefined)
  const [isTxProcessing, setTxProcessing] = useState(false)
  const router = useRouter()
  const [selectedGateway, setSelectedGateway] = useState("alchemy")
  const [gatewayOptions] = useState([
    { value: "alchemy", label: "Alchemy" },
    { value: "getblock", label: "GetBlock" },
    { value: "infura", label: "Infura" },
    { value: "quicknode", label: "QuickNode" },
  ])

  const renderGatewayOptions = useCallback(() => {
    return gatewayOptions.map((option) => (
      <Option
        key={option.value}
        isSelected={selectedGateway === option.value}
        value={option.value}
        label={option.label}
        handleChange={(value) => setSelectedGateway(value)}
      />
    ))
  }, [gatewayOptions, selectedGateway])

  useEffect(() => {
    if (userState.hasActiveSubscription) {
      router.push("/dashboard")
    }
  }, [userState])

  const activate = async (e: any) => {
    e.preventDefault()
    let selectedGatewayUrl = endPoints.alchemyTransactionGateway

    switch (selectedGateway) {
      case "alchemy":
        selectedGatewayUrl = endPoints.alchemyTransactionGateway
        break

      case "getblock":
        selectedGatewayUrl = endPoints.getblockTransactionGateway
        break

      case "infura":
        selectedGatewayUrl = endPoints.infuraTransactionGateway
        break

      case "quicknode":
        selectedGatewayUrl = endPoints.quicknodetransactionGateway
        break

      default:
        selectedGatewayUrl = endPoints.alchemyTransactionGateway
        break
    }

    try {
      setTxProcessing(true)
      const web3Provider = new Web3(selectedGatewayUrl)
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
        dispatch("setAppState", { refreshId: Math.random().toString(36).substring(7) })
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
      router.push("/subscription")
    }
  }

  return (
    <Suspense condition={!pricingDetails.isLoading} fallback={<Loading />}>
      <Suspense condition={!pricingDetails.error && !planNotFoundError} fallback={<Error />}>
        <div className="box">
          <p className="branding">Checkout</p>
          <p className="muted-text mb-2">Select a payment gateway to proceed</p>
          <InfoPanel infoIcon={<CheckCircledIcon />} infoName="Your total today" infoValue={`${plan?.price} MATIC`} />
          <p className="boxcategory-key mt-2">Select Transaction Gateway</p>
          <div className="mt-2 mb-2">
            <Row xl={2} lg={2} md={2} sm={2} xs={2}>
              {renderGatewayOptions()}
            </Row>
          </div>
          <Button disabled={userState.hasActiveSubscription || isTxProcessing} variant="primary" className="btn-block text-capitalize" onClick={activate}>
            <Suspense condition={!isTxProcessing} fallback={<><i className="fas fa-circle-notch fa-spin"></i> Activating Plan</>}>
              Pay with {selectedGateway}<PaperPlaneIcon className="icon-right" />
            </Suspense>
          </Button>
          <div className="text-center">
            <Badge bg="light" className="mt-1 mb-1 p-2 ps-3 pe-3"><LockClosedIcon className="icon-left" />Blockchain Secured</Badge>
          </div>
        </div>
      </Suspense>
    </Suspense>
  )
}