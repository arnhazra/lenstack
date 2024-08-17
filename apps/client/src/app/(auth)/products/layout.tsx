"use client"
import Suspense from "@/components/suspense"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import { ReactNode, useContext, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { usePathname, useRouter } from "next/navigation"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { ProductState } from "@/context/reducers/globalstate.reducer"

export default function ProductLayout({ children }: { children: ReactNode }) {
  const [{ userState }, dispatch] = useContext(GlobalContext)
  const pathName = usePathname()
  const productName = pathName.split("/")[2]
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=&category=All`, HTTPMethods.GET)
  const selectedProduct = products?.data?.find((product: any) => product.productName === productName)
  const router = useRouter()
  useEffect(() => dispatch("setProductState", selectedProduct as ProductState), [selectedProduct])

  useEffect(() => {
    if (!userState.hasActiveSubscription) {
      document.body.style.overflow = "hidden"
    }

    return () => {
      if (!userState.hasActiveSubscription) {
        document.body.style.overflow = ""
      }
    }
  }, [])

  return (
    <Suspense condition={!userState.hasActiveSubscription} fallback={children}>
      <div className="fixed inset-0 overflow-y-auto flex justify-center items-center auth-landing">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Hold On</CardTitle>
            <CardDescription>
              Seems like you are not having an active subscription to use/view this Product
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button size="lg" className="w-full" onClick={(): void => router.push("/subscription")}>
              Subscribe
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Suspense>
  )
}
