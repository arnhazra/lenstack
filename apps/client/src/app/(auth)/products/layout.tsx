"use client"
import Suspense from "@/components/suspense"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import { ReactNode, useContext, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { uiConstants } from "@/constants/global-constants"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"

export default function ProductLayout({ children }: { children: ReactNode }) {
  const [{ userState }] = useContext(GlobalContext)
  const pathName = usePathname()
  const productName = pathName.split("/")[2]
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=&category=All`, HTTPMethods.GET)
  const solutions = useQuery(["solutions"], endPoints.getSolutionConfig, HTTPMethods.GET)
  const selectedProduct = products?.data?.find((product: any) => product.productName === productName)
  const currentSolution = solutions?.data?.find((solution: any) => solution.solutionName === selectedProduct?.productCategory)
  const router = useRouter()

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

  const productPage = (
    <>
      <section id="hero" className="hero space-y-6 pb-12 pt-8 md:pt-16 lg:pt-16 lg:py-24">
        <div className="container flex flex-col gap-4">
          <Link href="" rel="noopener noreferrer">
            <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium">
              <div className="scale-50" dangerouslySetInnerHTML={{ __html: currentSolution?.solutionIcon }}></div>
              {currentSolution?.solutionName}
            </Badge>
          </Link>
          <h1 className="font-heading text-white text-3xl sm:text-4xl md:text-4xl lg:text-5xl">
            {uiConstants.brandName}
          </h1>
          <h1 className="font-heading text-white text-2xl sm:text-2xl md:text-2xl lg:text-3xl -mt-2">
            {selectedProduct?.displayName}
          </h1>
          <p className="leading-normal text-white text-xs md:text-md lg:text-lg">
            {selectedProduct?.description}
          </p>
          <div className="space-x-4 space-y-4">
            <Button variant="secondary" onClick={(): void => router.push(`/apireference?tab=${selectedProduct?.productName}`)}>
              API Reference
            </Button>
          </div>
        </div>
      </section>
      {children}
    </>
  )

  return (
    <Suspense condition={!userState.hasActiveSubscription} fallback={productPage}>
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
