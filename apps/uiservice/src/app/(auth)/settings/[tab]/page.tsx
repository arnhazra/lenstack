"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReactElement, useContext, useState } from "react"
import { GlobalContext } from "@/context/globalstate.provider"
import { endPoints } from "@/constants/api-endpoints"
import { brandName, uiConstants } from "@/constants/global-constants"
import ky from "ky"
import { Button } from "@/components/ui/button"
import Suspense from "@/components/suspense"
import { toast } from "@/components/ui/use-toast"
import { Tabs, tabsList } from "./data"
import { AtSign, CircleArrowRight, CircleUser, Fingerprint, IdCard, Info, Layers2, Leaf, Orbit, PieChart, PlusCircle, ScanFace, ShieldCheck, User, Wallet } from "lucide-react"
import { useRouter } from "next/navigation"
import OrgPanel from "../components/org"
import useQuery from "@/hooks/use-query"
import HTTPMethods from "@/constants/http-methods"
import { usePromptContext } from "@/providers/prompt.provider"
import { useConfirmContext } from "@/providers/confirm.provider"
import LoadingComponent from "@/components/loading"
import ErrorComponent from "@/components/error"
import { TierCardComponent } from "@/components/tiercard"
import { Switch } from "@/components/ui/switch"
import SectionPanel from "@/components/sectionpanel"
import CopyToClipboard from "@/components/copy"
import Link from "next/link"
import { FETCH_TIMEOUT } from "@/lib/fetch-timeout"

const mapTabIcons: Record<Tabs, ReactElement> = {
  user: <User />,
  privacy: <ShieldCheck />,
  organization: <Orbit />,
  wallet: <Wallet />,
  compute: <Layers2 />,
  sustainability: <Leaf />,
  about: <Info />
}

export default function Page({ params }: { params: { tab: string } }) {
  const [{ userState }, dispatch] = useContext(GlobalContext)
  const [computeTier, setComputeTier] = useState<string>(userState.computeTier)
  const selectedTab = params.tab
  const router = useRouter()
  const organizations = useQuery(["organizations"], endPoints.organization, HTTPMethods.GET)
  const pricing = useQuery(["pricing"], endPoints.getPricingConfig, HTTPMethods.GET)
  const { prompt } = usePromptContext()
  const { confirm } = useConfirmContext()

  const saveSustainabilitySettings = async (updatedSettings: boolean) => {
    try {
      dispatch("setUserState", { reduceCarbonEmissions: updatedSettings })
      await ky.patch(`${endPoints.updateAttribute}/reduceCarbonEmissions/${updatedSettings}`, { timeout: FETCH_TIMEOUT })
      toast({
        title: uiConstants.notification,
        description: <p className="text-zinc-600">{uiConstants.toastSuccess}</p>
      })
    }

    catch (error) {
      toast({
        title: uiConstants.notification,
        description: <p className="text-zinc-600">{uiConstants.toastError}</p>
      })
    }
  }

  const saveComputeTier = async () => {
    try {
      dispatch("setUserState", { computeTier })
      await ky.patch(`${endPoints.updateAttribute}/computeTier/${computeTier}`, { timeout: FETCH_TIMEOUT })
      toast({
        title: uiConstants.notification,
        description: <p className="text-zinc-600">{uiConstants.toastSuccess}</p>
      })
    }

    catch (error) {
      toast({
        title: uiConstants.notification,
        description: <p className="text-zinc-600">{uiConstants.toastError}</p>
      })
    }
  }

  const saveActivityLogSettings = async (updatedSettings: boolean) => {
    try {
      dispatch("setUserState", { activityLog: updatedSettings })
      await ky.patch(`${endPoints.updateAttribute}/activityLog/${updatedSettings}`, { timeout: FETCH_TIMEOUT })
      toast({
        title: uiConstants.notification,
        description: <p className="text-zinc-600">{uiConstants.toastSuccess}</p>
      })
    }

    catch (error) {
      toast({
        title: uiConstants.notification,
        description: <p className="text-zinc-600">{uiConstants.toastError}</p>
      })
    }
  }

  const signOut = async (signOutOption: string) => {
    try {
      if (signOutOption === "all") {
        await ky.post(endPoints.signOut, { timeout: FETCH_TIMEOUT })
      }
      localStorage.clear()
      window.location.replace("/")
    }

    catch (error) {
      toast({
        title: uiConstants.notification,
        description: <p className="text-zinc-600">{uiConstants.toastError}</p>
      })
    }
  }

  const renderTabs = tabsList.map((tab: Tabs) => {
    return (
      <div key={tab} className={`cursor-pointer flex capitalize ${tab === selectedTab ? "" : "text-zinc-500"}`} onClick={(): void => router.push(`/settings/${tab}`)}>
        <div className="me-2 scale-75 -mt-0.5">{mapTabIcons[tab]}</div>
        <p>{tab}</p>
      </div>
    )
  })

  const createOrg = async () => {
    const { hasConfirmed, value } = await prompt("New Organization Name")

    if (hasConfirmed && value) {
      try {
        await ky.post(endPoints.organization, { json: { name: value }, timeout: FETCH_TIMEOUT })
        organizations.refetch()
        dispatch("setUserState", { refreshId: Math.random().toString() })
        toast({
          title: uiConstants.notification,
          description: <p className="text-zinc-600">{uiConstants.organizationCreated}</p>
        })
      }

      catch (error) {
        toast({
          title: uiConstants.notification,
          description: <p className="text-zinc-600">{uiConstants.toastError}</p>
        })
      }
    }
  }

  const addAmountToWallet = async () => {
    const { hasConfirmed, value } = await prompt("Amount you want to add in your wallet")

    if (hasConfirmed && value) {
      try {
        const response: any = await ky.post(endPoints.createCheckoutSession, { json: { amount: value }, timeout: FETCH_TIMEOUT }).json()
        window.location = response.redirectUrl
      }

      catch (error) {
        toast({
          title: uiConstants.notification,
          description: <p className="text-zinc-600">{uiConstants.toastError}</p>
        })
      }
    }
  }

  const deleteOrg = async (orgId: string) => {
    const response = await confirm("Are you sure to delete this org ?")
    if (response) {
      try {
        await ky.delete(`${endPoints.organization}/${orgId}`, { timeout: FETCH_TIMEOUT })
        organizations.refetch()
        dispatch("setUserState", { refreshId: Math.random().toString() })
        toast({
          title: uiConstants.notification,
          description: <p className="text-zinc-600">{uiConstants.organizationDeleted}</p>
        })
      }

      catch (error) {
        toast({
          title: uiConstants.notification,
          description: <p className="text-zinc-600">{uiConstants.toastError}</p>
        })
      }
    }
  }

  const regenerateCreds = async (orgId: string) => {
    const response = await confirm("Are you sure to regenerate credentials for this org ?")
    if (response) {
      try {
        await ky.patch(`${endPoints.organization}/${orgId}`, { timeout: FETCH_TIMEOUT })
        organizations.refetch()
        dispatch("setUserState", { refreshId: Math.random().toString() })
        toast({
          title: uiConstants.notification,
          description: <p className="text-zinc-600">{uiConstants.toastSuccess}</p>
        })
      }

      catch (error) {
        toast({
          title: uiConstants.notification,
          description: <p className="text-zinc-600">{uiConstants.toastError}</p>
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
        onDelete={(orgId) => deleteOrg(orgId)}
      />
    )
  })

  return (
    <Suspense condition={tabsList.includes(selectedTab as Tabs)} fallback={<ErrorComponent />}>
      <Suspense condition={!organizations.isLoading && !pricing.isLoading} fallback={<LoadingComponent />}>
        <Suspense condition={!organizations.error && !pricing.error} fallback={<ErrorComponent />}>
          <div className="mx-auto grid w-full gap-2">
            <div className="flex justify-between">
              <div className="flex gap-4">
                <Button variant="secondary" size="icon" className="rounded-full">
                  <CircleUser className="h-5 w-5" />
                </Button>
                <div>
                  <p className="text-sm  font-semibold">{userState.name}</p>
                  <p className="text-sm text-zinc-600 font-semibold">{userState.email}</p>
                </div>
              </div>
              <Suspense condition={selectedTab === Tabs.Organization} fallback={null}>
                <Button size="icon" className="rounded-full" onClick={createOrg} title="Create Org"><PlusCircle className="scale-65" /></Button>
              </Suspense>
            </div>
          </div>
          <div className="mx-auto grid w-full items-start gap-4 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
            <nav className="grid gap-4 text-sm">
              {renderTabs}
            </nav>
            <div>
              <Suspense condition={selectedTab === Tabs.User} fallback={null}>
                <section className="grid gap-2">
                  <SectionPanel
                    icon={<User className="scale-75" />}
                    title="Your Name"
                    content={userState.name}
                  />
                  <SectionPanel
                    icon={<IdCard className="scale-75" />}
                    title={`${brandName} ID`}
                    content={userState.userId}
                    masked
                    actionComponent={<CopyToClipboard value={userState.userId} />}
                  />
                  <SectionPanel
                    icon={<AtSign className="scale-75" />}
                    title="Your Email"
                    content={userState.email}
                    actionComponent={<CopyToClipboard value={userState.email} />}
                  />
                  <SectionPanel
                    icon={<CircleArrowRight className="scale-75" />}
                    title="Sign Out"
                    content="Sign out from all logged in devices"
                    actionComponent={<Button size="icon" className="rounded-full" variant="destructive" onClick={(): Promise<void> => signOut("all")}><CircleArrowRight className="scale-75" /></Button>}
                  />
                </section>
              </Suspense>
              <Suspense condition={selectedTab === Tabs.Wallet} fallback={null}>
                <SectionPanel
                  icon={<Wallet className="scale-75" />}
                  title="Your Wallet Balance"
                  content={`$ ${userState.walletBalance.toFixed(2)}`}
                  actionComponent={
                    <Button
                      className="rounded-full"
                      variant="default"
                      size="icon"
                      title="Add amount to wallet"
                      onClick={addAmountToWallet}>
                      <PlusCircle className="scale-65" />
                    </Button>
                  }
                />
              </Suspense>
              <Suspense condition={selectedTab === Tabs.Privacy} fallback={null}>
                <section className="grid gap-2">
                  <SectionPanel
                    icon={<PieChart className="scale-75" />}
                    title="Activity Log"
                    content="Choose whether to save the things you do to get more relevant results"
                    actionComponent={<Switch checked={userState.activityLog} onCheckedChange={(value): Promise<void> => saveActivityLogSettings(value)} />}
                  />
                  <SectionPanel
                    icon={<Fingerprint className="scale-75" />}
                    title="Access Token"
                    content={localStorage.getItem("accessToken") ?? ""}
                    masked
                    actionComponent={<CopyToClipboard value={localStorage.getItem("accessToken") ?? ""} />}
                  />
                  <SectionPanel
                    icon={<ScanFace className="scale-75" />}
                    title="Refresh Token"
                    content={localStorage.getItem("refreshToken") ?? ""}
                    masked
                    actionComponent={<CopyToClipboard value={localStorage.getItem("refreshToken") ?? ""} />}
                  />
                </section>
              </Suspense>
              <Suspense condition={selectedTab === Tabs.Compute} fallback={null}>
                <section className="grid gap-2">
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
                <section className="grid gap-2">
                  {renderOrgs}
                </section>
              </Suspense>
              <Suspense condition={selectedTab === Tabs.Sustainability} fallback={null}>
                <SectionPanel
                  icon={<Leaf className="scale-75" />}
                  title="Reduce Carbon Emissions"
                  content={`Turn this settings on to reduce carbon footprints inside ${brandName}`}
                  actionComponent={
                    <Switch
                      checked={userState.reduceCarbonEmissions}
                      onCheckedChange={(value): Promise<void> => saveSustainabilitySettings(value)}
                    />}
                />
              </Suspense>
              <Suspense condition={selectedTab === Tabs.About} fallback={null}>
                <div className="flex flex-col items-center justify-center">
                  <div className="bg-zinc-200 w-24 h-24 rounded-2xl flex items-center justify-center ecosystem">
                    <span className="text-6xl text-white font-bold">16</span>
                  </div>
                  <p className="text-xs text-zinc-700 mt-4">{brandName} EcoSystem 16.0.0</p>
                  <Link target="_blank" className="text-xs text-blue-500" href="https://github.com/arnhazra/arcstack/blob/main/CHANGELOG.md">View Changelog</Link>
                </div>
              </Suspense>
            </div>
          </div>
        </Suspense>
      </Suspense>
    </Suspense>
  )
}
