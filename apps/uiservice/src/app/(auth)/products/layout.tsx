"use client"
import Suspense from "@/components/suspense"
import { GlobalContext } from "@/context/globalstate.provider"
import { ReactNode, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { usePathname, useRouter } from "next/navigation"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { brandName } from "@/constants/global-constants"
import { Badge } from "@/components/ui/badge"
import LoadingComponent from "@/components/loading"

export default function ProductLayout({ children }: { children: ReactNode }) {
  const [{ userState }] = useContext(GlobalContext)
  const pathName = usePathname()
  const productName = pathName.split("/")[2]
  const products = useQuery(["products", pathName], `${endPoints.getProductConfig}?searchQuery=&category=All`, HTTPMethods.GET)
  const selectedProduct = products?.data?.find((product: any) => product.productName === productName)
  const router = useRouter()

  const productPage = (
    <Suspense condition={!products.isLoading} fallback={<LoadingComponent />}>
      <Suspense condition={!pathName.includes("dataset")} fallback={null}>
        <div className="w-full">
          <div className="p-4">
            <Card className="hero text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
                <CardTitle className="text-sm font-medium">
                  <Badge variant="secondary" className="ps-4 pe-4 pt-1 pb-1">{selectedProduct?.productCategory}</Badge>
                </CardTitle>
                <div className="scale-75" dangerouslySetInnerHTML={{ __html: selectedProduct?.productIcon }} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">
                  {brandName} {selectedProduct?.displayName}
                </div>
                <p className="text-sm">
                  {selectedProduct?.description}
                </p>
              </CardContent>
              <CardFooter className="-mt-3">
                <Button variant="secondary" onClick={(): void => router.push(`/apireference/${selectedProduct?.productName}`)}>
                  API Reference
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </Suspense>
      {children}
    </Suspense>
  )

  return (
    <Suspense condition={userState.walletBalance < 0.2} fallback={productPage}>
      <div className="fixed inset-0 overflow-y-auto flex justify-center items-center auth-landing">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Hold On</CardTitle>
            <CardDescription>
              Seems like you do not have sufficient wallet balance to use/view this Product
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button size="lg" className="w-full" onClick={(): void => router.push("/settings/wallet")}>
              Add Money to Wallet
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Suspense>
  )
}
