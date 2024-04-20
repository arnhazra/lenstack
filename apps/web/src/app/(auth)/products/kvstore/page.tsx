"use client"
import Error from "@/app/error"
import Loading from "@/components/loading"
import Suspense from "@/components/suspense"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { endPoints } from "@/constants/api-endpoints"
import { uiConstants } from "@/constants/global-constants"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { format } from "date-fns"
import { useRouter } from "next/navigation"

export default function Page() {
  const kvList = useQuery(["kvlist"], `${endPoints.kvstoreReadKvList}`, HTTPMethods.GET)
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=kvstore&category=All`, HTTPMethods.GET)
  const selectedProduct = products?.data?.find((product: any) => product.productName === "kvstore")
  const router = useRouter()

  const renderKVS = kvList?.data?.kvs?.map((kv: any) => {
    return (
      <TableRow className="cursor-pointer" key={kv._id}>
        <TableCell><div className="font-medium">{kv?.key}</div></TableCell>
        <TableCell className="text-neutral-500">{kv?.value}</TableCell>
        <TableCell className="text-right text-neutral-500 hidden md:table-cell">{format(new Date(kv.createdAt), "MMM, do yyyy, h:mm a")}</TableCell>
      </TableRow>
    )
  })

  return (
    <Suspense condition={!kvList.isLoading && !products.isLoading} fallback={<Loading />}>
      <Suspense condition={!kvList.error && !products.error} fallback={<Error />}>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <div className="flex flex-col sm:gap-4 sm:py-4">
            <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols2 xl:grid-cols-1">
              <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                  <Card className="sm:col-span-2">
                    <CardHeader className="pb-3">
                      <CardTitle>{uiConstants.brandName} {selectedProduct?.displayName}</CardTitle>
                      <CardDescription className="max-w-lg text-balance leading-relaxed">
                        {selectedProduct?.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button onClick={(): void => router.push("/apireference")}>API Reference</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Metrics Count</CardDescription>
                      <CardTitle className="text-4xl">{kvList?.data?.kvs?.length}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground">
                        Total number of events
                        in this workspace
                      </div>
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Latest Event</CardDescription>
                      <Suspense condition={kvList?.data?.kvs?.length > 0} fallback={<CardTitle className="text-xl">No Data</CardTitle>}>
                        <CardTitle className="text-xl">{format(new Date(kvList?.data?.kvs[0]?.createdAt ?? new Date()), "MMM, do yyyy")}</CardTitle>
                        <CardTitle className="text-xl">{format(new Date(kvList?.data?.kvs[0]?.createdAt ?? new Date()), "h:mm a")}</CardTitle>
                      </Suspense>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground">
                        Latest event creation time
                      </div>
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                  </Card>
                </div>
                <div>
                  <Card>
                    <CardHeader className="px-7">
                      <CardTitle>KVs</CardTitle>
                      <CardDescription>
                        Your KV list in this workspace
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Suspense condition={kvList?.data?.kvs.length > 0} fallback={<p className="text-center">No data to display</p>}>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Key</TableHead>
                              <TableHead>Value</TableHead>
                              <TableHead className="text-right hidden md:table-cell">Created At</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {renderKVS}
                          </TableBody>
                        </Table>
                      </Suspense>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </Suspense>
  )
}
