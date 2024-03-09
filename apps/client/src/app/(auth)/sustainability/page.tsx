"use client"
import { useContext, useState, useEffect } from "react"
import { Button, Col, Row } from "react-bootstrap"
import { endPoints } from "@/constants/api-endpoints"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import axios from "axios"
import { toast } from "react-hot-toast"
import { uiConstants } from "@/constants/global-constants"
import Web3 from "web3"
import Suspense from "@/components/suspense"
import Loading from "@/components/loading"
import { AvatarIcon, BookmarkIcon, CalendarIcon, CubeIcon, DashboardIcon, ExitIcon, ExternalLinkIcon, PieChartIcon } from "@radix-ui/react-icons"
import SensitiveInfoPanel from "@/components/infopanel/sensitive-infopanel"
import InfoPanel from "@/components/infopanel/infopanel"
import Hero from "@/components/hero"
import CenterGrid from "@/components/centergrid"
import { format } from "date-fns"
import useQuery from "@/hooks/use-query"
import HTTPMethods from "@/constants/http-methods"
import Link from "next/link"
import Error from "@/components/error"

export default function Page() {
  const [{ userState }] = useContext(GlobalContext)
  const web3Provider = new Web3(endPoints.userTxGateway)
  const pricingDetails = useQuery(["pricing"], endPoints.getSubscriptionConfig, HTTPMethods.GET)
  const currentPlan = pricingDetails?.data?.find((plan: any) => plan.planName === userState.selectedPlan)
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

  const signOut = async (device: string) => {
    try {
      if (device === "all") {
        await axios.post(endPoints.signOut)
      }
      localStorage.clear()
      window.location.replace("/")
    }

    catch (error) {
      toast.error(uiConstants.toastError)
    }
  }

  return (
    <Suspense condition={!walletLoading && !pricingDetails.isLoading} fallback={<Loading />}>
      <Suspense condition={!pricingDetails.error} fallback={<Error />}>
        <CenterGrid>
          <Hero>
            <p className="branding">Sustainability Settings</p>
            <p className="text-muted mt-2 mb-4">Your Account Details</p>
            <InfoPanel infoIcon={<AvatarIcon />} infoName="Email Address" infoValue={userState.email} />
            <SensitiveInfoPanel credentialIcon={<CubeIcon />} credentialName="Wallet Address" credentialValue={accountAddress} />
            <InfoPanel infoIcon={<BookmarkIcon />} infoName="Wallet Balance" infoValue={`${Number(maticBalance).toFixed(2)} MATIC`} />
            <p className="text-muted mt-2 mb-4">Your Subscription Details</p>
            <InfoPanel infoIcon={<DashboardIcon />} infoName="Selected Plan" infoValue={userState.hasActiveSubscription ? userState.selectedPlan.charAt(0).toUpperCase() + userState.selectedPlan.slice(1) : "No Active Subscription"} />
            <Suspense condition={userState.hasActiveSubscription} fallback={null}>
              <InfoPanel infoIcon={<CalendarIcon />} infoName="Start Date" infoValue={userState.hasActiveSubscription ? format(new Date(userState.createdAt), "MMM, do yyyy") : "No Validity Data"} />
              <InfoPanel infoIcon={<CalendarIcon />} infoName="Valid Upto" infoValue={userState.hasActiveSubscription ? format(new Date(userState.expiresAt), "MMM, do yyyy") : "No Validity Data"} />
              <InfoPanel infoIcon={<PieChartIcon />} infoName="Subscription Usage" infoValue={userState.hasActiveSubscription ? `${userState.remainingCredits} / ${currentPlan?.grantedCredits} Credits remaining` : "No Subscriptions Usage Data"} />
            </Suspense>
            <Link className="btn btn-primary btn-block" href="/subscription/plans">Save Settings<ExternalLinkIcon className="icon-right" /></Link>

          </Hero>
        </CenterGrid>
      </Suspense>
    </Suspense>
  )
}
