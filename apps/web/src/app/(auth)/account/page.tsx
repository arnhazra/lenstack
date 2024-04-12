"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useContext, useEffect, useState } from "react"
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

export default function Page() {
  const web3Provider = new Web3(endPoints.userTxGateway)
  const [{ userState }, dispatch] = useContext(GlobalContext)
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [walletBalance, setWalletBalance] = useState<string>("0")
  const [signOutOption, setSignOutOption] = useState<string>("this")
  const [sustainabilitySettings, setSustainabilitySettings] = useState<string>("true")
  const [selectedTab, setSelectedTab] = useState<string>("general")

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

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Account</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm" x-chunk="dashboard-04-chunk-0">
            <p className="cursor-pointer" onClick={(): void => setSelectedTab("general")}>General</p>
            <p className="cursor-pointer" onClick={(): void => setSelectedTab("wallet")}>Wallet</p>
            <p className="cursor-pointer" onClick={(): void => setSelectedTab("subscription")}>Subscription</p>
            <p className="cursor-pointer" onClick={(): void => setSelectedTab("sustainability")}>Sustainability </p>
            <p className="cursor-pointer" onClick={(): void => setSelectedTab("advanced")}>Advanced</p>
          </nav>
          <div>
            <Suspense condition={selectedTab === "general"} fallback={null}>
              <section className="grid gap-6">
                <InfoPanel title="User ID" desc="Your unique identity inside platform" value={userState.userId} />
                <InfoPanel title="Email" desc="Your email address" value={userState.email} />
              </section>
            </Suspense>
            <Suspense condition={selectedTab === "wallet"} fallback={null}>
              <section className="grid gap-6">
                <InfoPanel title="Network" desc="Current selected Network & Chain" value="Polygon Amoy" />
                <InfoPanel title="Wallet Addresss" desc="Your blockchain wallet address" value={walletAddress} />
                <InfoPanel title="Wallet Balance" desc="Your blockchain wallet address" value={`${walletBalance} MATIC`} />
                <InfoPanel title="Private Key" desc="Your blockchain private key" value={userState.privateKey} masked />
              </section>
            </Suspense>
            <Suspense condition={selectedTab === "subscription"} fallback={null}>
              <section className="grid gap-6">
                <InfoPanel title="Selected Subscription" desc="Your current active subscription" value={userState.selectedPlan} />
                <InfoPanel title="Subscription Usage" desc="Your subscription usage for this month" value={`${userState.remainingCredits} credits remaining`} />
                <InfoPanel title="Subscription Validity" desc="Your subscription is valid upto" value={userState.expiresAt} />
              </section>
            </Suspense>
            <Suspense condition={selectedTab === "sustainability"} fallback={null}>
              <section className="grid gap-6">
                <Card x-chunk="dashboard-04-chunk-1">
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
                          <SelectItem value="false">Don't Use Sustainability Settings</SelectItem>
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
            <Suspense condition={selectedTab === "advanced"} fallback={null}>
              <section className="grid gap-6">
                <Card x-chunk="dashboard-04-chunk-1">
                  <CardHeader>
                    <CardTitle>Advanced</CardTitle>
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
      </main>
    </div>
  )
}
