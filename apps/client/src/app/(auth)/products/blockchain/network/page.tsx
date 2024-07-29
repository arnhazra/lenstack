"use client"
import { BookMarked, CopyIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter, useSearchParams } from "next/navigation"
import useQuery from "@/hooks/use-query"
import { apiHost, endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import Suspense from "@/components/suspense"
import Loading from "@/components/loading"
import Error from "@/components/error"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { uiConstants } from "@/constants/global-constants"
import { useContext } from "react"
import { GlobalContext } from "@/context/providers/globalstate.provider"

export default function Page() {
  const searchParams = useSearchParams()
  const [{ userState }] = useContext(GlobalContext)
  const networkId = searchParams.get("networkId")
  const router = useRouter()
  const network = useQuery(["network"], `${endPoints.blockchainViewNetwork}?networkId=${networkId}`, HTTPMethods.GET)
  const relatedNetworks = useQuery(["relatednetworks"], endPoints.blockchainFindNetworks, HTTPMethods.POST, { searchQuery: "", selectedGatewayFilter: network?.data?.rpcGateway ?? "", selectedNetworkFilter: "" })

  const copyRPCURI = () => {
    navigator.clipboard.writeText(`${apiHost}/api/products/blockchain/gateway/${networkId}?client_id=${userState.clientId}&client_secret=${userState.clientSecret}` ?? "")
    toast({
      title: "Notification",
      description: <p className="text-neutral-600">{uiConstants.copiedToClipBoard}</p>,
      action: <ToastAction altText="Goto schedule to undo">Okay</ToastAction>
    })
  }

  const renderNetworks = relatedNetworks?.data?.filter((network: any) => network?._id !== networkId).map((network: any) => {
    return (
      <TableRow className="cursor-pointer" key={network?._id} onClick={(): void => router.push(`/products/blockchain/network?networkId=${network._id}`)}>
        <TableCell><div className="font-medium">{network?.rpcProviderName}</div></TableCell>
        <TableCell className="text-neutral-500">{network?.rpcChain}</TableCell>
        <TableCell className="hidden md:table-cell">{network?.rpcGateway}</TableCell>
        <TableCell className="hidden md:table-cell">{network?.rpcNetwork}</TableCell>
      </TableRow>
    )
  })

  return (
    <Suspense condition={!network?.isLoading && !relatedNetworks?.isLoading} fallback={<Loading />}>
      <Suspense condition={!network.error && !!networkId && !relatedNetworks.error} fallback={<Error />}>
        <div className="flex min-h-screen w-full flex-col">
          <div className="flex flex-col sm:gap-4 sm:py-4">
            <div className="grid flex-1 items-start gap-4 p-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
              <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                  <Card className="sm:col-span-2 pb-4">
                    <CardHeader className="pb-3">
                      <CardTitle>{network?.data?.rpcProviderName}</CardTitle>
                      <CardDescription className="max-w-lg justify-normal">
                        {network?.data?.rpcChain}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Gateway</CardDescription>
                      <CardTitle className="text-4xl">{network?.data?.rpcGateway}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground">
                        RPC Gateway
                      </div>
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Network</CardDescription>
                      <CardTitle className="text-4xl">{network?.data?.rpcNetwork}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground">
                        RPC Network
                      </div>
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                  </Card>
                </div>
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Related Networks</CardTitle>
                    <CardDescription>
                      Networks of similar category
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Network Provider Name</TableHead>
                          <TableHead>Chain</TableHead>
                          <TableHead className="hidden md:table-cell">Gateway</TableHead>
                          <TableHead className="hidden md:table-cell">Network</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {renderNetworks}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                      {network?.data?.rpcProviderName}
                    </CardTitle>
                    <CardDescription>{network?.data?.rpcChain}</CardDescription>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <Button size="sm" variant="outline" className="h-8 gap-1" onClick={copyRPCURI}>
                      <CopyIcon className="h-3.5 w-3.5" />
                      <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                        Copy RPC URI
                      </span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                  <div className="grid gap-3">
                    <div className="font-semibold text-lg">Network Details</div>
                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Network Chain
                        </span>
                        <span>{network?.data?.rpcChain}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Network Gateway
                        </span>
                        <span>{network?.data?.rpcGateway}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Network
                        </span>
                        <span>{network?.data?.rpcNetwork}</span>
                      </li>
                    </ul>
                  </div>
                  <Separator className="my-4" />
                </CardContent>
                <CardFooter className="flex flex-row items-center bg-muted/50 px-6 py-3">
                  <Button variant="default" className="w-full" onClick={(): void => router.push("/apireference")}>Data API Reference<BookMarked className="scale-75" /></Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </Suspense>
    </Suspense>
  )
}
