"use client"
import { useEffect } from "react"
import { apiHost, endPoints } from "@/constants/api-endpoints"
import Suspense from "@/components/suspense"
import { Info } from "lucide-react"
import useQuery from "@/hooks/use-query"
import HTTPMethods from "@/constants/http-methods"
import SnippetPanel from "@/components/snippet"
import LoadingComponent from "@/components/loading"
import ErrorComponent from "@/components/error"
import { useRouter, useSearchParams } from "next/navigation"
import { uiConstants } from "@/constants/global-constants"

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedTab = searchParams.get("tab")
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=&category=`, HTTPMethods.GET)
  const apiReference = useQuery(["apireference"], `${endPoints.getapireference}/${selectedTab?.toLowerCase()}`, HTTPMethods.GET)

  useEffect(() => {
    if (!selectedTab) {
      router.push(`/apireference?tab=copilot`)
    }
  }, [selectedTab])

  const renderTabs = products?.data?.map((product: any) => {
    return (
      <div key={product?._id} className={`cursor-pointer flex capitalize ${product?.productName === selectedTab ? "" : "text-slate-500"}`} onClick={(): void => router.push(`/apireference?tab=${product?.productName}`)}>
        <div className="me-2 scale-75 -mt-0.5" dangerouslySetInnerHTML={{ __html: product?.productIcon }}></div>
        <p>{product?.displayName}</p>
      </div>
    )
  })

  const renderAPIReferences = apiReference.data?.map((item: any) => {
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
    <Suspense condition={!apiReference.isLoading} fallback={<LoadingComponent />}>
      <Suspense condition={!apiReference.error} fallback={<ErrorComponent />}>
        <div className="flex min-h-screen w-full flex-col">
          <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
            <div className="mx-auto grid w-full gap-2">
              <h1 className="text-3xl font-semibold mb-2">API Reference</h1>
              <p className="font-semibold text-sm flex gap-3 text-slate-600">
                <Info />
                {uiConstants.apiRefreneceStatement}
              </p>
            </div>
            <div className="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
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
