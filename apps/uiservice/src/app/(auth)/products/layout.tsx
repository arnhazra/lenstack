"use client"
import Suspense from "@/components/suspense"
import { GlobalContext } from "@/context/globalstate.provider"
import { Fragment, ReactNode, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { usePathname, useRouter } from "next/navigation"
import useQuery from "@/hooks/use-query"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"

export default function ProductLayout({ children }: { children: ReactNode }) {
  const [{ userState }] = useContext(GlobalContext)
  const router = useRouter()
  const pathName = usePathname()
  const productName = pathName.split("/")[2]
  const products = useQuery(["products", pathName], `${endPoints.getProductConfig}?searchQuery=&category=All`, HTTPMethods.GET)
  const selectedProduct = products?.data?.find((product: any) => product.productName === productName)

  const productLayout = (
    <Fragment>
      <div className="flex gap-4">
        <Button variant="secondary" size="icon" className="rounded-full">
          <div className="scale-75" dangerouslySetInnerHTML={{ __html: selectedProduct?.productIcon }} />
        </Button>
        <div>
          <p className="text-sm  font-semibold">{selectedProduct?.displayName}</p>
          <p className="text-sm text-zinc-600 font-semibold">{selectedProduct?.description}</p>
        </div>
      </div>
      {children}
    </Fragment>
  )

  return (
    <Suspense condition={userState.walletBalance < 0.2} fallback={productLayout}>
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
