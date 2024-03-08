"use client"
import { useContext, useState } from "react"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import Suspense from "@/components/suspense"
import { toast } from "react-hot-toast"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import Loading from "@/components/loading"
import { LockClosedIcon } from "@radix-ui/react-icons"
import { useRouter, useSearchParams } from "next/navigation"
import Web3 from "web3"
import axios from "axios"
import { uiConstants } from "@/constants/global-constants"
import Error from "@/components/error"
import { Badge, Button, Form } from "react-bootstrap"
import Option from "@/components/option"
import { useMutation } from "@tanstack/react-query"
import Hero from "@/components/hero"
import CenterGrid from "@/components/centergrid"

export default function Page() {
  const [allPlans] = useState<string[]>(["hobby", "starter", "premium", "ultra"])
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
    { value: "infura", label: "Infura" },
    { value: "quicknode", label: "QuickNode" },
  ])

  const { mutate: activateHobby } = useMutation({
    mutationFn: () => axios.get(endPoints.activateHobby),
    onSuccess() {
      dispatch("setAppState", { refreshId: Math.random().toString(36).substring(7) })
      toast.success(uiConstants.toastSuccess)
      router.refresh()
      router.push("/account")
    },
    onError() {
      toast.error(uiConstants.toastError)
    }
  })

  const activateOtherPlans = async () => {
    let selectedGatewayUrl = endPoints.subscriptionAlchemyGateway

    switch (selectedGateway) {
      case "alchemy":
        selectedGatewayUrl = endPoints.subscriptionAlchemyGateway
        break

      case "infura":
        selectedGatewayUrl = endPoints.subscriptionInfuraGateway
        break

      case "quicknode":
        selectedGatewayUrl = endPoints.subscriptionQuicknodeGateway
        break

      default:
        selectedGatewayUrl = endPoints.subscriptionAlchemyGateway
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
      router.push("/account")
    }
  }

  const activate = async (e: any) => {
    e.preventDefault()

    if (planName === "hobby") {
      activateHobby()
    }

    else {
      activateOtherPlans()
    }
  }

  const renderGatewayOptions = gatewayOptions.map((option) => (
    <Option
      key={option.value}
      isSelected={selectedGateway === option.value}
      value={option.value}
      label={option.label}
      handleChange={(value) => setSelectedGateway(value)}
    />
  ))

  return (
    <Suspense condition={!pricingDetails.isLoading} fallback={<Loading />}>
      <Suspense condition={!pricingDetails.error && !planNotFoundError} fallback={<Error />}>
        <CenterGrid>
          <Hero>
            <form onSubmit={activate}>
              <p className="branding">Payment</p>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Your Email</Form.Label>
                <Form.Control type="email" required placeholder="Your Email" autoComplete={"off"} />
              </Form.Group>
              <div className="mb-2">
                <p className="text-muted mb-2 mt-3">Select a payment gateway to proceed</p>
                {renderGatewayOptions}
              </div>
              <Button type="submit" disabled={userState.hasActiveSubscription || isTxProcessing} variant="primary" className="btn-block text-capitalize">
                <Suspense condition={!isTxProcessing} fallback={<><i className="fas fa-circle-notch fa-spin"></i> Activating Plan</>}>
                  <Suspense condition={planName !== "hobby"} fallback="Activate for Free">
                    Pay {`${plan?.price} MATIC`}
                  </Suspense>
                </Suspense>
              </Button>
              <div className="text-center">
                <Badge bg="light" className="p-2 ps-3 pe-3"><LockClosedIcon className="icon-left" />{uiConstants.brandName} Pay ™ Secured</Badge>
              </div>
            </form>
          </Hero>
        </CenterGrid>
      </Suspense>
    </Suspense>
  )
}