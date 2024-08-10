"use client"
import ErrorComponent from "@/components/error"
import LoadingComponent from "@/components/loading"
import Suspense from "@/components/suspense"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { endPoints } from "@/constants/api-endpoints"
import { uiConstants } from "@/constants/global-constants"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ListFilter } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { GlobalContext } from "@/context/providers/globalstate.provider"

export interface NetworkSearchRequestState {
  searchQuery: string
  selectedGatewayFilter: string
  selectedNetworkFilter: string
}

export default function Page() {
  const router = useRouter()
  const [{ userState }] = useContext(GlobalContext)
  const [networkSearchRequestState, setNetworkSearchRequestState] = useState<NetworkSearchRequestState>(
    { searchQuery: "", selectedGatewayFilter: "All", selectedNetworkFilter: "All" }
  )
  const gatewayFilters = useQuery(["gateway-filters"], endPoints.blockchainGatewayFilters, HTTPMethods.GET)
  const networkFilters = useQuery(["network-filters"], endPoints.blockchainNetworkFilters, HTTPMethods.GET)
  const networks = useQuery(["networks"], endPoints.blockchainFindNetworks, HTTPMethods.POST, networkSearchRequestState)
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=blockchain&category=All`, HTTPMethods.GET)
  const selectedProduct = products?.data?.find((product: any) => product.productName === "blockchain")

  useEffect(() => {
    setNetworkSearchRequestState({ ...networkSearchRequestState, searchQuery: userState.searchQuery })
  }, [userState.searchQuery])

  const renderGatewayOptions = gatewayFilters?.data?.map((item: string) => {
    return (
      <DropdownMenuCheckboxItem
        key={item}
        checked={networkSearchRequestState.selectedGatewayFilter === item}
        onClick={(): void => setNetworkSearchRequestState({ ...networkSearchRequestState, selectedGatewayFilter: item })}
      >
        {item}
      </DropdownMenuCheckboxItem>
    )
  })

  const renderNetworkOptions = networkFilters?.data?.map((item: string) => {
    return (
      <DropdownMenuCheckboxItem
        key={item}
        checked={networkSearchRequestState.selectedNetworkFilter === item}
        onClick={(): void => setNetworkSearchRequestState({ ...networkSearchRequestState, selectedNetworkFilter: item })}
      >
        {item}
      </DropdownMenuCheckboxItem>
    )
  })

  const renderNetworks = networks?.data?.map((network: any) => {
    return (
      <TableRow className="cursor-pointer" key={network?._id} onClick={(): void => router.push(`/products/blockchain/network?networkId=${network._id}`)}>
        <TableCell><div className="font-medium">{network?.rpcProviderName}</div></TableCell>
        <TableCell className="text-stone-500">{network?.rpcChain}</TableCell>
        <TableCell className="hidden md:table-cell">{network?.rpcGateway}</TableCell>
        <TableCell className="hidden md:table-cell">{network?.rpcNetwork}</TableCell>
      </TableRow>
    )
  })

  return (
    <Suspense condition={!networks.isLoading && !products.isLoading} fallback={<LoadingComponent />}>
      <Suspense condition={!networks.error && !products.error} fallback={<ErrorComponent />}>
        <div className="flex min-h-screen w-full flex-col">
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card className="sm:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle>{uiConstants.brandName} {selectedProduct?.displayName}</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    {selectedProduct?.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button onClick={(): void => router.push(`/apireference?tab=${selectedProduct?.productName}`)}>API Reference</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Networks Count</CardDescription>
                  <CardTitle className="text-4xl">{networks?.data?.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Total number of networks
                    results shown
                  </div>
                </CardContent>
                <CardFooter>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Network Categories</CardDescription>
                  <CardTitle className="text-4xl">{networkFilters?.data?.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Number of network categories
                  </div>
                </CardContent>
                <CardFooter>
                </CardFooter>
              </Card>
            </div>
            <Card className="xl:col-span-2">
              <CardHeader className="px-7">
                <CardTitle>RPC Networks</CardTitle>
                <CardDescription>
                  Explore networks from different chains
                </CardDescription>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span>
                          Gateway Filter
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {renderGatewayOptions}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span>
                          Network Filter
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {renderNetworkOptions}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <Suspense condition={networks?.data?.length > 0} fallback={<p className="text-center">No networks to display</p>}>
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
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>
      </Suspense >
    </Suspense >
  )
}
