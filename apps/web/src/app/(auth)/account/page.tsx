"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useContext, useEffect, useState } from "react"
import Web3 from "web3"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import { endPoints } from "@/constants/api-endpoints"
import toast from "react-hot-toast"
import { uiConstants } from "@/constants/global-constants"
import axios from "axios"
import { Button } from "@/components/ui/button"

export default function Page() {
  const web3Provider = new Web3(endPoints.userTxGateway)
  const [{ userState }, dispatch] = useContext(GlobalContext)
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [walletBalance, setWalletBalance] = useState<string>("0")
  const [signOutOption, setSignOutOption] = useState<string>("this")
  const [sustainabilitySettings, setSustainabilitySettings] = useState<string>("true")

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
        toast.error(uiConstants.toastError)
      }
    })()
  }, [userState.privateKey, userState.userId])

  const saveSustainabilitySettings = async () => {
    try {
      const updatedSettings = sustainabilitySettings === "true" ? true : false
      dispatch("setUserState", { reduceCarbonEmissions: updatedSettings })
      await axios.patch(endPoints.updateCarbonSettings, { reduceCarbonEmissions: updatedSettings })
      toast.success(uiConstants.toastSuccess)
    }

    catch (error) {
      toast.error(uiConstants.toastError)
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
      toast.error(uiConstants.toastError)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Account</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0">
            <Link href="#">General</Link>
            <Link href="#">Wallet</Link>
            <Link href="#">Subscription</Link>
            <Link href="#">Sustainability </Link>
            <Link href="#">Advanced</Link>
          </nav>
          <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>User ID</CardTitle>
                <CardDescription>
                  Your unique identity inside platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input value={userState.userId} disabled />
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Email</CardTitle>
                <CardDescription>
                  Your email address
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input value={userState.email} disabled />
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Network</CardTitle>
                <CardDescription>
                  Current selected Network & Chain
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input value={"Polygon Amoy"} disabled />
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Wallet Addresss</CardTitle>
                <CardDescription>
                  Your blockchain wallet address
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input value={walletAddress} disabled />
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Wallet Balance</CardTitle>
                <CardDescription>
                  Your blockchain wallet address
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input value={`${walletBalance} MATIC`} disabled />
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Selected Subscription</CardTitle>
                <CardDescription>
                  Your current active subscription
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input value={userState.selectedPlan} disabled className="capitalize" />
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Subscription Usage</CardTitle>
                <CardDescription>
                  Your subscription usage for this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input value={`${userState.remainingCredits} credits remaining`} disabled />
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Subscription Validity</CardTitle>
                <CardDescription>
                  Your subscription is valid upto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input value={userState.expiresAt} disabled />
              </CardContent>
            </Card>
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
          </div>
        </div>
      </main>
    </div>
  )
}
