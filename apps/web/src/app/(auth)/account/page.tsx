"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReactElement, useContext, useEffect, useState } from "react"
import Web3 from "web3"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import { endPoints } from "@/constants/api-endpoints"
import { uiConstants } from "@/constants/global-constants"
import axios from "axios"
import { Button } from "@/components/ui/button"
import Suspense from "@/components/suspense"
import InfoPanel from "@/components/infopanel"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Tabs, tabsList } from "./data"
import { format } from "date-fns"
import { Bolt, Calendar, Leaf, Settings, Wallet } from "lucide-react"

const mapTabIcons: Record<Tabs, ReactElement> = {
  advanced: <Settings />,
  general: <Bolt />,
  subscription: <Calendar />,
  sustainability: <Leaf />,
  wallet: <Wallet />
}

export default function Page() {
  const web3Provider = new Web3(endPoints.userTxGateway)
  const [{ userState }, dispatch] = useContext(GlobalContext)
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [walletBalance, setWalletBalance] = useState<string>("0")
  const [signOutOption, setSignOutOption] = useState<string>("this")
  const [sustainabilitySettings, setSustainabilitySettings] = useState<string>("true")
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.General)

  useEffect(() => {
    (async () => {
      try {
        const { privateKey } = userState
        const { address: walletAddress } = web3Provider.eth.accounts.privateKeyToAccount(privateKey)
        setWalletAddress(walletAddress)
        const walletBalanceInWei = await web3Provider.eth.getBalance(walletAddress)
        const walletBalance = web3Provider.utils.fromWei(walletBalanceInWei, "ether")
        setWalletBalance(walletBalance)
      }

      catch (error) {
        toast({
          title: "Notification",
          description: <p className="text-neutral-600">{uiConstants.toastError}</p>,
          action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>
        })
      }
    })()
  }, [userState.privateKey, userState.userId])

  const saveSustainabilitySettings = async () => {
    try {
      const updatedSettings = sustainabilitySettings === "true" ? true : false
      dispatch("setUserState", { reduceCarbonEmissions: updatedSettings })
      await axios.patch(endPoints.updateCarbonSettings, { reduceCarbonEmissions: updatedSettings })
      toast({
        title: "Notification",
        description: <p className="text-neutral-600">{uiConstants.toastSuccess}</p>,
        action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>
      })
    }

    catch (error) {
      toast({
        title: "Notification",
        description: <p className="text-neutral-600">{uiConstants.toastError}</p>,
        action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>
      })
    }
  }

  const signOut = async () => {
    try {
      if (signOutOption === "all") {
        await axios.post(endPoints.signOut)
      }
      localStorage.clear()
      window.location.replace("/")
    }

    catch (error) {
      toast({
        title: "Notification",
        description: <p className="text-neutral-600">{uiConstants.toastError}</p>,
        action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>
      })
    }
  }

  const renderTabs = tabsList.map((tab: Tabs) => {
    return (
      <div key={tab} className={`cursor-pointer flex capitalize ${tab === selectedTab ? "" : "text-neutral-500"}`} onClick={(): void => setSelectedTab(tab)}>
        <div className="me-2 scale-75 -mt-0.5">{mapTabIcons[tab]}</div>
        <p>{tab}</p>
      </div>
    )
  })

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Account Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm">
            {renderTabs}
          </nav>
          <div>
            <Suspense condition={selectedTab === Tabs.General} fallback={null}>
              <section className="grid gap-6">
                <InfoPanel title={`${uiConstants.brandName} ID`} desc="This is your user ID within platform" value={userState.userId} />
                <InfoPanel title="Your Email" desc="Your email address" value={userState.email} />
              </section>
            </Suspense>
            <Suspense condition={selectedTab === Tabs.Wallet} fallback={null}>
              <section className="grid gap-6">
                <InfoPanel title="Network" desc="Current selected Network & Chain" value="Polygon Amoy" />
                <InfoPanel title="Wallet Addresss" desc="Your blockchain wallet address" value={walletAddress} />
                <InfoPanel title="Wallet Balance" desc="Your blockchain wallet balance" value={`${Number(walletBalance).toFixed(2)} MATIC`} />
                <InfoPanel title="Private Key" desc="Your blockchain private key" value={userState.privateKey} masked />
              </section>
            </Suspense>
            <Suspense condition={selectedTab === Tabs.Subscription} fallback={null}>
              <section className="grid gap-6">
                <InfoPanel title="Selected Subscription" desc="Your current active subscription" value={userState.hasActiveSubscription ? userState.selectedPlan : "No Active Subscription"} capitalize />
                <InfoPanel title="Subscription Usage" desc="Your subscription usage for this month" value={`${userState.remainingCredits} credits remaining`} />
                <InfoPanel title="Subscription Start" desc="Your subscription has started on" value={userState.hasActiveSubscription ? format(new Date(userState.createdAt), "MMM, do yyyy") : "No Validity Data"} />
                <InfoPanel title="Subscription Validity" desc="Your subscription is valid upto" value={userState.hasActiveSubscription ? format(new Date(userState.expiresAt), "MMM, do yyyy") : "No Validity Data"} />
              </section>
            </Suspense>
            <Suspense condition={selectedTab === Tabs.Sustainability} fallback={null}>
              <section className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sustainability</CardTitle>
                    <CardDescription>
                      {uiConstants.brandName} is committed towards a sustainable development by reducing Carbon footprints.
                      Change your sustainability settings below.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Select defaultValue={userState.reduceCarbonEmissions.toString()} onValueChange={(value: string) => setSustainabilitySettings(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="true">Use Sustainability Settings</SelectItem>
                          <SelectItem value="false">Do not use Sustainability Settings</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={saveSustainabilitySettings}>Save Settings</Button>
                  </CardFooter>
                </Card>
              </section>
            </Suspense>
            <Suspense condition={selectedTab === Tabs.Advanced} fallback={null}>
              <section className="grid gap-6">
                <InfoPanel title="Token" desc="Your Access Token" value={localStorage.getItem("accessToken") ?? ""} masked />
                <Card>
                  <CardHeader>
                    <CardTitle>Sign Out</CardTitle>
                    <CardDescription>
                      This is your advanced sign out settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Select defaultValue="this" onValueChange={(value: string) => setSignOutOption(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="this">Sign Out from this device</SelectItem>
                          <SelectItem value="all">Sign Out from all devices</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={signOut}>Apply & Sign Out</Button>
                  </CardFooter>
                </Card>
              </section>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
