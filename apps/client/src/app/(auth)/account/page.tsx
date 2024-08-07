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
import { format } from "date-fns"
import { Bolt, Calendar, Leaf, Network, Settings, ShieldCheck } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import OrgPanel from "./org"
import useQuery from "@/hooks/use-query"
import HTTPMethods from "@/constants/http-methods"
import { usePromptContext } from "@/context/providers/prompt.provider"
import { useConfirmContext } from "@/context/providers/confirm.provider"
import LoadingComponent from "@/components/loading"
import Error from "@/components/error"
import { convertToTitleCase } from "@/lib/convert-to-title-case"

const mapTabIcons: Record<Tabs, ReactElement> = {
  general: <Bolt />,
  subscription: <Calendar />,
  dataPrivacy: <ShieldCheck />,
  organization: < Network />,
  sustainability: <Leaf />,
  advanced: <Settings />,
}

export default function Page() {
  const [{ userState }, dispatch] = useContext(GlobalContext)
  const [signOutOption, setSignOutOption] = useState<string>("this")
  const [sustainabilitySettings, setSustainabilitySettings] = useState<string>("true")
  const [usageInsights, setUsageInsights] = useState<string>("true")
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
        title: "Notification",
        description: <p className="text-neutral-600">{uiConstants.toastSuccess}</p>
      })
    }

    catch (error) {
      toast({
        title: "Notification",
        description: <p className="text-neutral-600">{uiConstants.toastError}</p>
      })
    }
  }

  const saveUsageInsightsSettings = async () => {
    try {
      const updatedSettings = usageInsights === "true" ? true : false
      dispatch("setUserState", { usageInsights: updatedSettings })
      await axios.patch(`${endPoints.updateAttribute}/usageInsights/${updatedSettings}`)
      toast({
        title: "Notification",
        description: <p className="text-neutral-600">{uiConstants.toastSuccess}</p>
      })
    }

    catch (error) {
      toast({
        title: "Notification",
        description: <p className="text-neutral-600">{uiConstants.toastError}</p>
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
        description: <p className="text-neutral-600">{uiConstants.toastError}</p>
      })
    }
  }

  const renderTabs = tabsList.map((tab: Tabs) => {
    return (
      <div key={tab} className={`cursor-pointer flex capitalize ${tab === selectedTab ? "" : "text-neutral-500"}`} onClick={(): void => router.push(`/account?tab=${tab}`)}>
        <div className="me-2 scale-75 -mt-0.5">{mapTabIcons[tab]}</div>
        <p>{convertToTitleCase(tab)}</p>
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
          title: "Notification",
          description: <p className="text-neutral-600">Organization created</p>
        })
      }

      catch (error) {
        toast({
          title: "Notification",
          description: <p className="text-neutral-600">Creating organization failed</p>
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
          title: "Notification",
          description: <p className="text-neutral-600">Organization switched</p>
        })
      }

      catch (error) {
        toast({
          title: "Notification",
          description: <p className="text-neutral-600">Organization switching failed</p>
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
          title: "Notification",
          description: <p className="text-neutral-600">Organization deleted</p>
        })
      }

      catch (error) {
        toast({
          title: "Notification",
          description: <p className="text-neutral-600">Organization deletion failed</p>
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
        onSwitch={(orgId) => switchOrg(orgId)}
        onDelete={(orgId) => deleteOrg(orgId)}
      />
    )
  })

  return (
    <Suspense condition={!organizations.isLoading} fallback={<LoadingComponent />}>
      <Suspense condition={!organizations.error} fallback={<Error />}>
        <div className="flex min-h-screen w-full flex-col">
          <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
            <div className="mx-auto grid w-full gap-2">
              <div className="flex justify-between">
                <h1 className="text-3xl font-semibold">Account Settings</h1>
                <Suspense condition={selectedTab === Tabs.Organization} fallback={null}>
                  <Button onClick={createOrg}>Create Org</Button>
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
                    <InfoPanel title={`${uiConstants.brandName} ID`} desc="This is your user ID within platform" value={userState.userId} />
                    <InfoPanel title="Your Email" desc="Your email address" value={userState.email} />
                  </section>
                </Suspense>
                <Suspense condition={selectedTab === Tabs.Subscription} fallback={null}>
                  <section className="grid gap-6">
                    <InfoPanel title="Selected Subscription" desc="Your current active subscription" value={userState.hasActiveSubscription ? userState.selectedPlan.toUpperCase() : "No Active Subscription"} capitalize />
                    <InfoPanel title="Subscription Usage" desc="Your subscription usage for this month" value={`${userState.remainingCredits} credits remaining`} />
                    <InfoPanel title="Subscription Start" desc="Your subscription has started on" value={userState.hasActiveSubscription ? format(new Date(userState.createdAt), "MMM, do yyyy") : "No Validity Data"} />
                    <InfoPanel title="Subscription Validity" desc="Your subscription is valid upto" value={userState.hasActiveSubscription ? format(new Date(userState.expiresAt), "MMM, do yyyy") : "No Validity Data"} />
                  </section>
                </Suspense>
                <Suspense condition={selectedTab === Tabs.DataPrivacy} fallback={null}>
                  <section className="grid gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Usage Insights</CardTitle>
                        <CardDescription>
                          {uiConstants.brandName} saves your activity on database securely for better and more personalized user experience on {uiConstants.brandName} platform.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Select defaultValue={userState.usageInsights.toString()} onValueChange={(value: string) => setUsageInsights(value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="true">Participate in Insights Data Collection</SelectItem>
                              <SelectItem value="false">Do not Participate in Insights Data Collection</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={saveUsageInsightsSettings}>Save Settings</Button>
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
