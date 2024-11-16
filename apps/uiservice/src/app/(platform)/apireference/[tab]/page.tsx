"use client"
import { apiHost, endPoints } from "@/shared/constants/api-endpoints"
import Suspense from "@/shared/components/suspense"
import { Book } from "lucide-react"
import useQuery from "@/shared/hooks/use-query"
import HTTPMethods from "@/shared/constants/http-methods"
import SnippetPanel from "../(components)/snippet"
import LoadingComponent from "@/shared/components/loading"
import ErrorComponent from "@/shared/components/error"
import { useRouter } from "next/navigation"
import { uiConstants } from "@/shared/constants/global-constants"
import ActivityLog from "@/shared/components/activity"
import { use } from "react"

export default function Page({ params }: { params: Promise<{ tab: string }> }) {
  const router = useRouter()
  const { tab } = use(params)
  const products = useQuery(
    ["products"],
    endPoints.getProductConfig,
    HTTPMethods.GET
  )
  const apiReference = useQuery(
    ["apireference", tab ?? ""],
    `${endPoints.getapireference}/${tab?.toLowerCase()}`,
    HTTPMethods.GET
  )

  const renderTabs = products?.data?.map((product: any) => {
    return (
      <div
        key={product?._id}
        className={`cursor-pointer flex capitalize ${
          product?.productName === tab ? "" : "text-slate-500"
        }`}
        onClick={(): void =>
          router.push(`/apireference/${product?.productName}`)
        }
      >
        <div
          className="me-2 scale-75 -mt-0.5"
          dangerouslySetInnerHTML={{ __html: product?.productIcon }}
        ></div>
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
    <Suspense
      condition={!apiReference.isLoading && !products.isLoading}
      fallback={<LoadingComponent />}
    >
      <Suspense
        condition={!apiReference.error && !products.error}
        fallback={<ErrorComponent />}
      >
        <div className="bg-white flex justify-between items-center mb-4 p-2 border rounded-md ps-4 pe-4">
          <div className="flex gap-4 items-center">
            <Book className="h-5 w-5" />
            <div>
              <p className="text-sm  font-semibold">API Reference</p>
              <p className="text-sm text-red-800 font-semibold">
                {uiConstants.apiRefreneceStatement}
              </p>
            </div>
          </div>
          <ActivityLog keyword="apireference" />
        </div>
        <div className="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm">{renderTabs}</nav>
          <div>
            <section className="grid gap-6">{renderAPIReferences}</section>
          </div>
        </div>
      </Suspense>
    </Suspense>
  )
}
