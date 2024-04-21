"use client"
import Error from "@/components/error"
import Loading from "@/components/loading"
import Suspense from "@/components/suspense"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { endPoints } from "@/constants/api-endpoints"
import { uiConstants } from "@/constants/global-constants"
import HTTPMethods from "@/constants/http-methods"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import useQuery from "@/hooks/use-query"
import { useContext } from "react"
import { TradingModal } from "./tradingmodal"

export default function Page() {
  const [{ appState }] = useContext(GlobalContext)
  const swapTokenConfig = useQuery(["swaptokenconfig"], `${endPoints.swapTokenConfig}?searchQuery=${appState.globalSearchString}`, HTTPMethods.GET)
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=swap&category=All`, HTTPMethods.GET)
  const selectedProduct = products?.data?.find((product: any) => product.productName === "swap")

  const renderTokens = swapTokenConfig?.data?.map((token: any) => {
    return (
      <TableRow className="cursor-pointer" key={token._id}>
        <TableCell className="hidden md:table-cell">{token?.tokenName}</TableCell>
        <TableCell className="text-neutral-500">{token?.tokenSymbol}</TableCell>
        <TableCell className="hidden md:table-cell">{token?.description}</TableCell>
        <TableCell>{token?.tokensPerMatic}/MATIC</TableCell>
        <TableHead className="text-right">
          <TradingModal token={token} />
        </TableHead>
      </TableRow>
    )
  })

  return (
    <Suspense condition={!swapTokenConfig.isLoading && !products.isLoading} fallback={<Loading />}>
      <Suspense condition={!swapTokenConfig.error && !products.error} fallback={<Error />}>
        <div className="flex min-h-screen w-full flex-col">
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>{uiConstants.brandName} {selectedProduct?.displayName}</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    {selectedProduct?.description}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Metrics Count</CardDescription>
                  <CardTitle className="text-4xl">{swapTokenConfig?.data?.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Total Tokens
                  </div>
                </CardContent>
                <CardFooter>
                </CardFooter>
              </Card>
            </div>
            <Card>
              <CardHeader className="px-7">
                <CardTitle>ERC-20 Tokens</CardTitle>
                <CardDescription>
                  List of ERC-20 tokens available for trading
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense condition={swapTokenConfig?.data?.length > 0} fallback={<p className="text-center">No tokens to display</p>}>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden md:table-cell">Token Name</TableHead>
                        <TableHead>Token Symbol</TableHead>
                        <TableHead className="hidden md:table-cell">Token Info</TableHead>
                        <TableHead>Token Price</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {renderTokens}
                    </TableBody>
                  </Table>
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>
      </Suspense>
    </Suspense>
  )
}
