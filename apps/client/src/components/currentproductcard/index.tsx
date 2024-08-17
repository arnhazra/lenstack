import { GlobalContext } from "@/context/providers/globalstate.provider"
import useQuery from "@/hooks/use-query"
import { useContext } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import { Orbit } from "lucide-react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import Suspense from "../suspense"
import { Skeleton } from "../ui/skeleton"
import { uiConstants } from "@/constants/global-constants"

export default function CurrentProductCard() {
  const [{ productState }] = useContext(GlobalContext)
  const router = useRouter()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {productState.productCategory}
        </CardTitle>
        <div className="scale-75" dangerouslySetInnerHTML={{ __html: productState.productIcon }} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {uiConstants.brandName} {productState.displayName}
        </div>
        <p className="text-sm text-slate-600">
          {productState.description}
        </p>
      </CardContent>
      <CardFooter className="-mt-3">
        <Button onClick={(): void => router.push(`/apireference?tab=${productState.productName}`)}>
          API Reference
        </Button>
      </CardFooter>
    </Card>
  )
}
