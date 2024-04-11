"use client"
import { useContext, useState, useEffect } from "react"
import { endPoints } from "@/constants/api-endpoints"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import axios from "axios"
import { toast } from "react-hot-toast"
import { uiConstants } from "@/constants/global-constants"
import Web3 from "web3"
import Suspense from "@/components/suspense"
import Loading from "@/components/skeleton"
import { AvatarIcon, BookmarkIcon, CalendarIcon, CheckCircledIcon, CubeIcon, DashboardIcon, ExitIcon, PieChartIcon } from "lucide-react"
import { format } from "date-fns"
import useQuery from "@/hooks/use-query"
import HTTPMethods from "@/constants/http-methods"

export default function Page() {
  const [{ userState }, dispatch] = useContext(GlobalContext)
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
  }, [userState.privateKey, userState.userId])

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

  const saveSettings = async (reduceCarbonEmissions: boolean) => {
    try {
      dispatch("setUserState", { reduceCarbonEmissions: !userState.reduceCarbonEmissions })
      await axios.patch(endPoints.updateCarbonSettings, { reduceCarbonEmissions })
      dispatch("setAppState", { refreshId: Math.random().toString(36).substring(7) })
      toast.success(uiConstants.toastSuccess)
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
            <p className="branding">Account & Usage</p>
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
            <p className="text-muted mt-2 mb-4">
              <i className="fa-brands fa-envira"></i> {uiConstants.brandName} is committed towards a sustainable development by reducing Carbon footprints. Change your sustainability settings below.
            </p>
            <Option
              key="reduceCarbonEmissions"
              isSelected={userState?.reduceCarbonEmissions}
              value="reduceCarbonEmissions"
              label="Reduce Carbon Emissions"
              handleChange={(): Promise<void> => saveSettings(!userState.reduceCarbonEmissions)}
            />
            <Row className="justify-content-center" >
              <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                <Button variant="secondary" className="btn-block" onClick={(): Promise<void> => signOut("this")}>Sign Out<ExitIcon className="icon-right" /></Button>
              </Col>
              <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                <Button variant="primary" className="btn-block" onClick={(): Promise<void> => signOut("all")}>Sign out from all devices<ExitIcon className="icon-right" /></Button>
              </Col>
            </Row>
          </Hero>
        </CenterGrid>
      </Suspense>
    </Suspense>
  )
}
