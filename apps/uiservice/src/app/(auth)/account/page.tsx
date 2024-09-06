"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReactElement, useContext, useState } from "react"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import { endPoints } from "@/constants/api-endpoints"
import { brandName, uiConstants } from "@/constants/global-constants"
import axios from "axios"
import { Button } from "@/components/ui/button"
import Suspense from "@/components/suspense"
import InfoPanel from "@/components/infopanel"
import { toast } from "@/components/ui/use-toast"
import { Tabs, tabsList } from "./data"
import { CircleUser, ComputerIcon, Leaf, Network, ShieldCheck, User, Wallet } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import OrgPanel from "./org"
import useQuery from "@/hooks/use-query"
import HTTPMethods from "@/constants/http-methods"
import { usePromptContext } from "@/context/providers/prompt.provider"
import { useConfirmContext } from "@/context/providers/confirm.provider"
import LoadingComponent from "@/components/loading"
import ErrorComponent from "@/components/error"
import { TierCardComponent } from "@/components/tiercard"
import { Switch } from "@/components/ui/switch"

const mapTabIcons: Record<Tabs, ReactElement> = {
  user: <User />,
  privacy: <ShieldCheck />,
  organization: < Network />,
  wallet: <Wallet />,
  compute: <ComputerIcon />,
  sustainability: <Leaf />,
}

export default function Page() {
  const [{ userState }, dispatch] = useContext(GlobalContext)
  const [computeTier, setComputeTier] = useState<string>(userState.computeTier)
  const searchParams = useSearchParams()
  const selectedTab = searchParams.get("tab") ?? Tabs.User
  const router = useRouter()
  const organizations = useQuery(["organizations"], endPoints.organization, HTTPMethods.GET)
  const pricing = useQuery(["pricing"], endPoints.getPricingConfig, HTTPMethods.GET)
  const { prompt } = usePromptContext()
  const { confirm } = useConfirmContext()

  const saveSustainabilitySettings = async (updatedSettings: boolean) => {
    try {
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

  const saveComputeTier = async () => {
    try {
      dispatch("setUserState", { computeTier })
      await axios.patch(`${endPoints.updateAttribute}/computeTier/${computeTier}`)
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

  const saveActivityLogSettings = async (updatedSettings: boolean) => {
    try {
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

  const signOut = async (signOutOption: string) => {
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
          description: <p className="text-slate-600">{uiConstants.organizationCreated}</p>
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
          description: <p className="text-slate-600">{uiConstants.toastError}</p>
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
          description: <p className="text-slate-600">{uiConstants.organizationSwitched}</p>
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

  const deleteOrg = async (orgId: string) => {
    const response = await confirm("Are you sure to delete this org ?")
    if (response) {
      try {
        await axios.delete(`${endPoints.organization}/${orgId}`)
        organizations.refetch()
        dispatch("setUserState", { refreshId: Math.random().toString() })
        toast({
          title: uiConstants.notification,
          description: <p className="text-slate-600">{uiConstants.organizationDeleted}</p>
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
    <Suspense condition={!organizations.isLoading && !pricing.isLoading} fallback={<LoadingComponent />}>
      <Suspense condition={!organizations.error && !pricing.error} fallback={<ErrorComponent />}>
        <div className="flex min-h-screen w-full flex-col">
          <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
            <div className="mx-auto grid w-full gap-2">
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <Button variant="secondary" size="icon" className="rounded-full">
                    <CircleUser className="h-5 w-5" />
                  </Button>
                  <div>
                    <p className="text-sm  font-semibold">{userState.name}</p>
                    <p className="text-sm text-slate-600 font-semibold">{userState.email}</p>
                  </div>
                </div>
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
                <Suspense condition={selectedTab === Tabs.User} fallback={null}>
                  <section className="grid gap-6">
                    <InfoPanel title="Your Name" desc="Your Name" value={userState.name} />
                    <InfoPanel title={`${brandName} ID`} desc="This is your user ID within platform" value={userState.userId} />
                    <InfoPanel title="Your Email" desc="Your email address" value={userState.email} />
                    <InfoPanel title="Access Token" desc="Your Access Token" value={localStorage.getItem("accessToken") ?? ""} masked />
                    <InfoPanel title="Refresh Token" desc="Your Refresh Token" value={localStorage.getItem("refreshToken") ?? ""} masked />
                    <Card>
                      <CardHeader>
                        <CardTitle>Sign Out</CardTitle>
                        <CardDescription>
                          This is your advanced sign out settings
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="me-4" variant="default" onClick={(): Promise<void> => signOut("this")}>Sign Out</Button>
                        <Button variant="destructive" onClick={(): Promise<void> => signOut("all")}>Sign Out from all devices</Button>
                      </CardContent>
                    </Card>
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
                          {brandName} saves your activity on database securely for better and more personalized user experience on {brandName} platform.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <p className="text-base">
                                Activity Log
                              </p>
                              <p className="text-xs text-slate-500">
                                Activity Data Collection Settings
                              </p>
                            </div>
                            <Switch checked={userState.activityLog} onCheckedChange={(value): Promise<void> => saveActivityLogSettings(value)} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </section>
                </Suspense>
                <Suspense condition={selectedTab === Tabs.Compute} fallback={null}>
                  <section className="grid gap-6">
                    <TierCardComponent
                      computeTier={computeTier}
                      estimatedRequestCost={pricing?.data?.find((item: any) => item.computeTier === computeTier)?.estimatedRequestCost}
                      responseDelay={pricing?.data?.find((item: any) => item.computeTier === computeTier)?.responseDelay}
                    />
                    <Card>
                      <CardHeader>
                        <CardTitle>Compute Tier</CardTitle>
                        <CardDescription>
                          Select the compute tier based on your performance requirement. Higher computer tier has higer API request cost.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Select defaultValue={userState.computeTier} onValueChange={(value: string) => setComputeTier(value)}>
                          <SelectTrigger className="capitalize">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {pricing?.data?.map((item: any) =>
                                <SelectItem
                                  className="capitalize"
                                  value={item.computeTier} key={item.computeTier}
                                >
                                  {item.computeTier}
                                </SelectItem>)}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={saveComputeTier}>Save Settings</Button>
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
                          {brandName} is committed towards a sustainable development by reducing Carbon footprints.
                          Change your sustainability settings below.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <p className="text-base">
                                Reduce Carbon Emissions
                              </p>
                              <p className="text-xs text-slate-500">
                                Turn this settings on to reduce carbon footprints inside {brandName}
                              </p>
                            </div>
                            <Switch checked={userState.reduceCarbonEmissions} onCheckedChange={(value): Promise<void> => saveSustainabilitySettings(value)} />
                          </div>
                        </div>
                      </CardContent>
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
