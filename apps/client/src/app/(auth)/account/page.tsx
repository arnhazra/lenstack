"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReactElement, useContext, useEffect, useState } from "react"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import { endPoints } from "@/constants/api-endpoints"
import { uiConstants } from "@/constants/global-constants"
import axios from "axios"
import { Button } from "@/components/ui/button"
import Suspense from "@/components/suspense"
import InfoPanel from "@/components/infopanel"
import { toast } from "@/components/ui/use-toast"
import { Tabs, tabsList } from "./data"
import { Bolt, Calendar, Leaf, Network, Settings, ShieldCheck, Wallet } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import OrgPanel from "./org"
import useQuery from "@/hooks/use-query"
import HTTPMethods from "@/constants/http-methods"
import { usePromptContext } from "@/context/providers/prompt.provider"
import { useConfirmContext } from "@/context/providers/confirm.provider"
import LoadingComponent from "@/components/loading"
import ErrorComponent from "@/components/error"

const mapTabIcons: Record<Tabs, ReactElement> = {
  general: <Bolt />,
  wallet: <Wallet />,
  privacy: <ShieldCheck />,
  organization: < Network />,
  sustainability: <Leaf />,
  advanced: <Settings />,
}

export default function Page() {
  const [{ userState }, dispatch] = useContext(GlobalContext)
  const [signOutOption, setSignOutOption] = useState<string>("this")
  const [sustainabilitySettings, setSustainabilitySettings] = useState<string>("true")
  const [activityLog, setActivityLog] = useState<string>("true")
  const searchParams = useSearchParams()
  const selectedTab = searchParams.get("tab")
  const router = useRouter()
  const organizations = useQuery(["organizations"], endPoints.organization, HTTPMethods.GET)
  const { prompt } = usePromptContext()
  const { confirm } = useConfirmContext()

  useEffect(() => {
    if (!selectedTab) {
      router.push(`/account?tab=${Tabs.General}`)
    }
  }, [selectedTab])

  const saveSustainabilitySettings = async () => {
    try {
      const updatedSettings = sustainabilitySettings === "true" ? true : false
      dispatch("setUserState", { reduceCarbonEmissions: updatedSettings })
      await axios.patch(`${endPoints.updateAttribute}/reduceCarbonEmissions/${updatedSettings}`)
      toast({
        title: uiConstants.notification,
        description: <p className="text-slate-600">{uiConstants.toastSuccess}</p>
      })
    }

    catch (error) {
      toast({
        title: uiConstants.notification,
        description: <p className="text-slate-600">{uiConstants.toastError}</p>
      })
    }
  }

  const saveActivityLogSettings = async () => {
    try {
      const updatedSettings = activityLog === "true" ? true : false
      dispatch("setUserState", { activityLog: updatedSettings })
      await axios.patch(`${endPoints.updateAttribute}/activityLog/${updatedSettings}`)
      toast({
        title: uiConstants.notification,
        description: <p className="text-slate-600">{uiConstants.toastSuccess}</p>
      })
    }

    catch (error) {
      toast({
        title: uiConstants.notification,
        description: <p className="text-slate-600">{uiConstants.toastError}</p>
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
        title: uiConstants.notification,
        description: <p className="text-slate-600">{uiConstants.toastError}</p>
      })
    }
  }

  const renderTabs = tabsList.map((tab: Tabs) => {
    return (
      <div key={tab} className={`cursor-pointer flex capitalize ${tab === selectedTab ? "" : "text-slate-500"}`} onClick={(): void => router.push(`/account?tab=${tab}`)}>
        <div className="me-2 scale-75 -mt-0.5">{mapTabIcons[tab]}</div>
        <p>{tab}</p>
      </div>
    )
  })

  const createOrg = async () => {
    const { hasConfirmed, value } = await prompt("New Organization Name")

    if (hasConfirmed && value) {
      try {
        await axios.post(endPoints.organization, { name: value })
        organizations.refetch()
        dispatch("setUserState", { refreshId: Math.random().toString() })
        toast({
          title: uiConstants.notification,
          description: <p className="text-slate-600">Organization created</p>
        })
      }

      catch (error) {
        toast({
          title: uiConstants.notification,
          description: <p className="text-slate-600">Creating organization failed</p>
        })
      }
    }
  }

  const addAmountToWallet = async () => {
    const { hasConfirmed, value } = await prompt("Amount you want to add in your wallet")

    if (hasConfirmed && value) {
      try {
        const response = await axios.post(endPoints.createCheckoutSession, { amount: value })
        window.location = response.data.redirectUrl
      }

      catch (error) {
        toast({
          title: uiConstants.notification,
          description: <p className="text-slate-600">Error creating checkout session</p>
        })
      }
    }
  }

  const switchOrg = async (orgId: string) => {
    const response = await confirm("Are you sure to switch to this org ?")
    if (response) {
      try {
        await axios.patch(`${endPoints.updateAttribute}/selectedOrgId/${orgId}`)
        organizations.refetch()
        dispatch("setUserState", { refreshId: Math.random().toString() })
        toast({
          title: uiConstants.notification,
          description: <p className="text-slate-600">Organization switched</p>
        })
      }

      catch (error) {
        toast({
          title: uiConstants.notification,
          description: <p className="text-slate-600">Organization switching failed</p>
        })
      }
    }
  }

  const deleteOrg = async (orgId: string) => {
    const response = await confirm("Are you sure to delete this org ?")
    if (response) {
      try {
        await axios.delete(`${endPoints.organization}/${orgId}`)
        organizations.refetch()
        dispatch("setUserState", { refreshId: Math.random().toString() })
        toast({
          title: uiConstants.notification,
          description: <p className="text-slate-600">Organization deleted</p>
        })
      }

      catch (error) {
        toast({
          title: uiConstants.notification,
          description: <p className="text-slate-600">Organization deletion failed</p>
        })
      }
    }
  }

  const regenerateCreds = async (orgId: string) => {
    const response = await confirm("Are you sure to regenerate credentials for this org ?")
    if (response) {
      try {
        await axios.patch(`${endPoints.organization}/${orgId}`)
        organizations.refetch()
        dispatch("setUserState", { refreshId: Math.random().toString() })
        toast({
          title: uiConstants.notification,
          description: <p className="text-slate-600">{uiConstants.toastSuccess}</p>
        })
      }

      catch (error) {
        toast({
          title: uiConstants.notification,
          description: <p className="text-slate-600">{uiConstants.toastError}</p>
        })
      }
    }
  }

  const renderOrgs = organizations?.data?.map((organization: any) => {
    return (
      <OrgPanel
        key={organization?._id}
        orgId={organization?._id}
        isSelected={organization._id === userState.selectedOrgId}
        displayName={organization?.name}
        clientId={organization?.clientId}
        clientSecret={organization?.clientSecret}
        createdAt={organization?.createdAt}
        onRegenCred={(orgId) => regenerateCreds(orgId)}
        onSwitch={(orgId) => switchOrg(orgId)}
        onDelete={(orgId) => deleteOrg(orgId)}
      />
    )
  })

  return (
    <Suspense condition={!organizations.isLoading} fallback={<LoadingComponent />}>
      <Suspense condition={!organizations.error} fallback={<ErrorComponent />}>
        <div className="flex min-h-screen w-full flex-col">
          <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
            <div className="mx-auto grid w-full gap-2">
              <div className="flex justify-between">
                <h1 className="text-3xl font-semibold">Account Settings</h1>
                <Suspense condition={selectedTab === Tabs.Organization} fallback={null}>
                  <Button onClick={createOrg}>Create Org</Button>
                </Suspense>
                <Suspense condition={selectedTab === Tabs.Wallet} fallback={null}>
                  <Button onClick={addAmountToWallet}>Add Amount to Wallet</Button>
                </Suspense>
              </div>
            </div>
            <div className="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
              <nav className="grid gap-4 text-sm">
                {renderTabs}
              </nav>
              <div>
                <Suspense condition={selectedTab === Tabs.General} fallback={null}>
                  <section className="grid gap-6">
                    <InfoPanel title="Your Name" desc="Your Name" value={userState.name} />
                    <InfoPanel title={`${uiConstants.brandName} ID`} desc="This is your user ID within platform" value={userState.userId} />
                    <InfoPanel title="Your Email" desc="Your email address" value={userState.email} />
                  </section>
                </Suspense>
                <Suspense condition={selectedTab === Tabs.Wallet} fallback={null}>
                  <section className="grid gap-6">
                    <InfoPanel title="Your Wallet Balance" desc="Your wallet balance" value={`$ ${userState.walletBalance.toFixed(2)}`} capitalize />
                  </section>
                </Suspense>
                <Suspense condition={selectedTab === Tabs.Privacy} fallback={null}>
                  <section className="grid gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Activity Log</CardTitle>
                        <CardDescription>
                          {uiConstants.brandName} saves your activity on database securely for better and more personalized user experience on {uiConstants.brandName} platform.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Select defaultValue={userState.activityLog.toString()} onValueChange={(value: string) => setActivityLog(value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="true">Activity Data Collection On</SelectItem>
                              <SelectItem value="false">Activity Data Collection Off</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={saveActivityLogSettings}>Save Settings</Button>
                      </CardFooter>
                    </Card>
                  </section>
                </Suspense>
                <Suspense condition={selectedTab === Tabs.Organization} fallback={null}>
                  <section className="grid gap-6">
                    {renderOrgs}
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
      </Suspense>
    </Suspense>
  )
}
