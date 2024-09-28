"use client"
import Suspense from "@/components/suspense"
import { GlobalContext } from "@/context/globalstate.provider"
import { ReactNode, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { usePathname, useRouter } from "next/navigation"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import LoadingComponent from "@/components/loading"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"

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
        <Breadcrumb className="-mt-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{selectedProduct?.displayName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
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
