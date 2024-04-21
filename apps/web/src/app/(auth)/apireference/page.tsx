"use client"
import { ReactElement, useState } from "react"
import { apiHost, endPoints } from "@/constants/api-endpoints"
import Suspense from "@/components/suspense"
import { Tabs, tabsList } from "./data"
import { Braces, DatabaseZap, PieChart, Sparkles } from "lucide-react"
import useQuery from "@/hooks/use-query"
import HTTPMethods from "@/constants/http-methods"
import { convertToTitleCase } from "../../../lib/convertToTitleCase"
import SnippetPanel from "@/components/snippet"
import Loading from "@/components/loading"
import Error from "@/app/error"

const mapTabIcons: Record<Tabs, ReactElement> = {
  analytics: <PieChart />,
  copilot: <Sparkles />,
  dataExchange: <Braces />,
  kvStore: <DatabaseZap />
}

export default function Page() {
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.Analytics)
  const apiReference = useQuery(["apireference"], `${endPoints.getapireference}?productName=${selectedTab.toLowerCase()}`, HTTPMethods.GET)

  const renderTabs = tabsList.map((tab: Tabs) => {
    return (
      <div key={tab} className={`cursor-pointer flex capitalize ${tab === selectedTab ? "" : "text-neutral-500"}`} onClick={(): void => setSelectedTab(tab)}>
        <div className="me-2 scale-75 -mt-0.5">{mapTabIcons[tab]}</div>
        <p>{convertToTitleCase(tab)}</p>
      </div>
    )
  })

  const renderAPIReferences = apiReference.data?.docList?.map((item: any) => {
    return (
      <SnippetPanel
        method={item.apiMethod}
        key={item._id}
        request={item.sampleRequestBody}
        response={item.sampleResponseBody}
        title={item.apiName}
        url={apiHost + item.apiUri}
      />
    )
  })

  return (
    <Suspense condition={!apiReference.isLoading} fallback={<Loading />}>
      <Suspense condition={!apiReference.error} fallback={<Error />}>
        <div className="flex min-h-screen w-full flex-col">
          <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
            <div className="mx-auto grid w-full max-w-6xl gap-2">
              <h1 className="text-3xl font-semibold">API Reference</h1>
            </div>
            <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
              <nav className="grid gap-4 text-sm">
                {renderTabs}
              </nav>
              <div>
                <section className="grid gap-6">
                  {renderAPIReferences}
                </section>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </Suspense>
  )
}
