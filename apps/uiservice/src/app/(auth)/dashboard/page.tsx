"use client"
import { Wallet, Layers2, Orbit, Sparkles, User2, BoxIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "@/context/globalstate.provider"
import useQuery from "@/hooks/use-query"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import { useRouter } from "next/navigation"
import { brandName, uiConstants } from "@/constants/global-constants"
import Suspense from "@/components/suspense"
import LoadingComponent from "@/components/loading"
import ErrorComponent from "@/components/error"
import { Input } from "@/components/ui/input"

export default function Page() {
  const [{ userState }] = useContext(GlobalContext)
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [searchString, setSearchString] = useState("")
  const solutions = useQuery(["solutions"], endPoints.getSolutionConfig, HTTPMethods.GET)
  const products = useQuery(["products", selectedFilter], `${endPoints.getProductConfig}?searchQuery=${searchString}&category=${selectedFilter}`, HTTPMethods.GET)
  const router = useRouter()
  useEffect(() => { if (!searchString) products.refetch() }, [searchString])

  const renderProducts = products?.data?.map((product: any) => {
    return (
      <TableRow
        className="cursor-pointer"
        key={product.displayName}
        onClick={(): void => product?.productStatus === "Available" ? router.push(`/products/${product.productName}`) : undefined}
      >
        <TableCell><div dangerouslySetInnerHTML={{ __html: product?.productIcon }} className="scale-75" /></TableCell>
        <TableCell><div className="font-medium">{brandName} {product?.displayName}</div></TableCell>
        <TableCell className="text-zinc-500 hidden md:table-cell">{product?.description}</TableCell>
        <TableCell className="hidden md:table-cell">{product?.productStatus}</TableCell>
        <TableCell className="text-right">
          <Badge variant="outline">
            <div className="scale-50" dangerouslySetInnerHTML={{ __html: solutions?.data?.find((solution: any) => solution?.solutionName === product?.productCategory)?.solutionIcon }}></div>
            {product?.productCategory}
          </Badge>
        </TableCell>
      </TableRow >

    )
  })

  const renderSolutionTabs = solutions?.data?.map((solution: any) => {
    return (
      <div
        key={solution?.solutionName}
        className={`cursor-pointer flex capitalize ${selectedFilter === solution?.solutionName ? "" : "text-zinc-500"}`}
        onClick={(): void => setSelectedFilter(solution?.solutionName)}
      >
        <div className="scale-75 me-2" dangerouslySetInnerHTML={{ __html: solution?.solutionIcon }} />
        <p>{solution?.solutionName}</p>
      </div>
    )
  })

  return (
    <Suspense condition={!products.isLoading} fallback={<LoadingComponent />}>
      <Suspense condition={!products.error} fallback={<ErrorComponent />}>
        <div className="flex gap-4">
          <Button variant="secondary" size="icon" className="rounded-full">
            <User2 className="h-5 w-5" />
          </Button>
          <div>
            <p className="text-sm  font-semibold">Hey, {userState.name.split(" ")[0]}</p>
            <p className="text-sm text-zinc-600 font-semibold">Welcome to your dashboard</p>
          </div>
        </div>
        <div className="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm">
            <div
              key={"all"}
              className={`cursor-pointer flex capitalize ${selectedFilter === "All" ? "" : "text-zinc-500"}`}
              onClick={(): void => setSelectedFilter("All")}
            >
              <BoxIcon className="scale-75 me-2" />
              <p>All</p>
            </div>
            {renderSolutionTabs}
          </nav>
          <div>
            <form onSubmit={(e) => { e.preventDefault(); products.refetch() }}>
              <div className="relative">
                <Sparkles className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                <Input
                  defaultValue={searchString}
                  onChange={(e): void => setSearchString(e.target.value)}
                  type="search"
                  placeholder="Type anything and press enter to get suggested products powered by AI"
                  className="mb-4 pl-8 w-full h-12 focus:outline-none"
                />
                <p className="text-xs text-zinc-500 -mt-2 mb-2 ms-1">{uiConstants.aiSafetyStatement}</p>
              </div>
            </form>
            <section className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 mb-4">
                <Card className="cursor-pointer" onClick={(): void => router.push("/settings/organization")}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Current Organization
                    </CardTitle>
                    <Orbit className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {userState.selectedOrgName}
                    </div>
                    <p className="text-sm text-zinc-600">
                      Your current organization
                    </p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer" onClick={(): void => router.push("/settings/wallet")}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$ {userState.walletBalance.toFixed(2)}</div>
                    <p className="text-sm text-zinc-600">
                      Credits remaining
                    </p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer" onClick={(): void => router.push("/settings/compute")}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Compute Tier</CardTitle>
                    <Layers2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold capitalize">{userState.computeTier}</div>
                    <p className="text-sm text-zinc-600">
                      Current compute tier
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>
            <Card className="xl:col-span-2">
              <CardHeader className="px-7">
                <CardTitle>Products</CardTitle>
                <p className="text-sm text-zinc-600 mt-1">Product offerings by {brandName}</p>
              </CardHeader>
              <CardContent>

                <Suspense condition={!products.isRefetching} fallback={<p className="text-center">Generating best products suggestions for you</p>}>
                  <Suspense condition={products?.data?.length > 0} fallback={<p className="text-center">No products to display</p>}>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead></TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead className="hidden md:table-cell">Description</TableHead>
                          <TableHead className="hidden md:table-cell">Status</TableHead>
                          <TableHead className="text-right">Category</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {renderProducts}
                      </TableBody>
                    </Table>
                  </Suspense>
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>
      </Suspense>
    </Suspense>
  )
}
