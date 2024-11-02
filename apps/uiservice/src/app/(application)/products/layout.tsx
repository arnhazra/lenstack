"use client"
import Suspense from "@/components/suspense"
import { GlobalContext } from "@/context/globalstate.provider"
import { ReactNode, useContext } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { usePathname, useRouter } from "next/navigation"
import useQuery from "@/hooks/use-query"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import ActivityLog from "@/components/activity"
import LoadingComponent from "@/components/loading"
import ErrorComponent from "@/components/error"
import { brandName } from "@/constants/global-constants"

export default function ProductLayout({ children }: { children: ReactNode }) {
  const [{ subscription }] = useContext(GlobalContext)
  const router = useRouter()
  const pathName = usePathname()
  const productName = pathName.split("/")[2]
  const products = useQuery(
    ["products", pathName],
    endPoints.getProductConfig,
    HTTPMethods.GET
  )
  const selectedProduct = products?.data?.find(
    (product: any) => product.productName === productName
  )

  const productLayout = (
    <Suspense condition={!products.isLoading} fallback={<LoadingComponent />}>
      <Suspense condition={!products.error} fallback={<ErrorComponent />}>
        <div className="bg-white flex justify-between items-center mb-4 p-2 border rounded-md ps-4 pe-4">
          <div className="flex gap-4 items-center">
            <div
              className="scale-75"
              dangerouslySetInnerHTML={{ __html: selectedProduct?.productIcon }}
            />
            <div>
              <p className="text-sm font-semibold">
                {brandName} {selectedProduct?.displayName}
              </p>
              <p className="text-sm text-zinc-600 font-semibold">
                {selectedProduct?.description}
              </p>
            </div>
          </div>
          <ActivityLog keyword={productName} />
        </div>
        {children}
      </Suspense>
    </Suspense>
  )

  return (
    <Suspense condition={!subscription} fallback={productLayout}>
      <div className="fixed inset-0 overflow-y-auto flex justify-center items-center auth-landing">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Hold On</CardTitle>
            <CardDescription>
              Seems like you do not have an active subscription to use/view this
              product
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              size="lg"
              className="w-full"
              onClick={(): void => router.push("/settings/subscription")}
            >
              Go to Subscriptions
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Suspense>
  )
}
