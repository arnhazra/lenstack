"use client"
import { apiHost, endPoints } from "@/shared/constants/api-endpoints"
import { Book } from "lucide-react"
import useFetch from "@/shared/hooks/use-fetch"
import HTTPMethods from "@/shared/constants/http-methods"
import SnippetPanel from "../(components)/snippet"
import { useRouter } from "nextjs-toploader/app"
import { uiConstants } from "@/shared/constants/global-constants"
import ActivityLog from "@/shared/components/activity"
import { use } from "react"

export default function Page({ params }: { params: Promise<{ tab: string }> }) {
  const router = useRouter()
  const { tab } = use(params)
  const products = useFetch({
    queryKey: ["products"],
    queryUrl: endPoints.getProductConfig,
    method: HTTPMethods.GET,
    suspense: true,
  })
  const apiReference = useFetch({
    queryKey: ["apireference", tab ?? ""],
    queryUrl: `${endPoints.getapireference}/${tab?.toLowerCase()}`,
    method: HTTPMethods.GET,
    suspense: true,
  })

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
    <>
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
    </>
  )
}
