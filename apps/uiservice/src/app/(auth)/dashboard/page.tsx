"use client"
import { Copy, CreditCard, Orbit, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useContext } from "react"
import { GlobalContext } from "@/context/globalstate.provider"
import { useRouter } from "next/navigation"
import useQuery from "@/hooks/use-query"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import { brandName } from "@/constants/global-constants"
import { Product } from "@/types/Types"
import Suspense from "@/components/suspense"
import LoadingComponent from "@/components/loading"
import ErrorComponent from "@/components/error"
import MaskText from "@/components/mask"

export default function Page() {
  const products = useQuery(["products"], endPoints.getProductConfig, HTTPMethods.GET)
  const [{ userState }] = useContext(GlobalContext)
  const router = useRouter()

  const renderProducts = products?.data?.map((product: Product) => {
    return (
      <TableRow className="bg-accent cursor-pointer" key={product?._id} onClick={(): void => router.push(`/products/${product?.productName}`)}>
        <TableCell>
          <div className="font-medium">{brandName} {product?.displayName}</div>
          <div className="hidden text-xs text-zinc-500 md:inline">
            {product?.description}
          </div>
        </TableCell>
        <TableCell className="hidden sm:table-cell">
          {product?.productCategory}
        </TableCell>
        <TableCell className="text-right">{product?.productStatus}</TableCell>
      </TableRow>
    )
  })

  return (
    <Suspense condition={!products.isLoading} fallback={<LoadingComponent />}>
      <Suspense condition={!products.error} fallback={<ErrorComponent />}>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle>Hey, {userState.name.split(" ")[0]}</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Introducing Our Dynamic Dashboard for Seamless
                    Management and Insightful Analysis.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button onClick={(): void => router.push("/settings/organization")}>View Organizations</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Wallet Balance</CardDescription>
                  <CardTitle className="text-2xl">$ {userState.walletBalance.toFixed(2)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Available Credits
                  </div>
                </CardContent>
                <CardFooter>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Compute Tier</CardDescription>
                  <CardTitle className="text-2xl capitalize">{userState.computeTier}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Selected Compute Tier
                  </div>
                </CardContent>
                <CardFooter>
                </CardFooter>
              </Card>
            </div>
            <Card>
              <CardHeader className="px-7">
                <CardTitle>Products</CardTitle>
                <CardDescription>
                  Product offerings by {brandName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="hidden sm:table-cell">Category</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {renderProducts}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-start bg-zinc-50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    Organization
                    <Button size="icon" variant="outline" className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100">
                      <Copy className="h-3 w-3" />
                      <span className="sr-only">Copy Order ID</span>
                    </Button>
                  </CardTitle>
                  <CardDescription>{userState?.selectedOrgName}</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <Button size="sm" variant="outline" className="h-8 gap-1" onClick={(): void => router.push("/settings/organization")}>
                    <Orbit className="h-3.5 w-3.5" />
                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                      Open Org
                    </span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Org Information</div>
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Client Id
                      </span>
                      <span><MaskText value={userState.clientId} /></span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Client Secret
                      </span>
                      <span><MaskText value={userState.clientSecret} /></span>
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">User Information</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Name</dt>
                      <dd>{userState.name}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Email</dt>
                      <dd>
                        <a href="mailto:">{userState.email}</a>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Wallet Balance</dt>
                      <dd>$ {userState.walletBalance.toFixed(2)}</dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
              <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                  {brandName} Inc.
                </div>
              </CardFooter>
            </Card>
          </div>
        </main>
      </Suspense>
    </Suspense>
  )
}