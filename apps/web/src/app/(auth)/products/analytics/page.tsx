"use client"
import Error from "@/components/error"
import Loading from "@/components/loading"
import Suspense from "@/components/suspense"
import { Badge } from "@/components/ui/badge"
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
  const analytics = useQuery(["analytics"], endPoints.analyticsView, HTTPMethods.GET)
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=analytics&category=All`, HTTPMethods.GET)
  const selectedProduct = products?.data?.find((product: any) => product.productName === "analytics")
  const router = useRouter()

  const renderAnalytics = analytics?.data?.analytics?.map((ant: any) => {
    return (
      <TableRow className="cursor-pointer" key={ant._id}>
        <TableCell><div className="font-medium">{ant?.component}</div></TableCell>
        <TableCell className="text-neutral-500">{ant?.event}</TableCell>
        <TableCell className="hidden md:table-cell">{ant?.info}</TableCell>
        <TableCell className="hidden md:table-cell"><Badge variant="outline">{ant?.statusCode}</Badge></TableCell>
        <TableCell className="text-right hidden md:table-cell">{format(new Date(ant.createdAt), "MMM, do yyyy, h:mm a")}</TableCell>
      </TableRow>
    )
  })

  return (
    <Suspense condition={!analytics.isLoading && !products.isLoading} fallback={<Loading />}>
      <Suspense condition={!analytics.error && !products.error} fallback={<Error />}>
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
                      <CardTitle className="text-4xl">{analytics?.data?.analytics?.length}</CardTitle>
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
                      <Suspense condition={analytics?.data?.analytics?.length > 0} fallback={<CardTitle className="text-xl">No Data</CardTitle>}>
                        <CardTitle className="text-xl">{format(new Date(analytics?.data?.analytics[0]?.createdAt ?? new Date()), "MMM, do yyyy")}</CardTitle>
                        <CardTitle className="text-xl">{format(new Date(analytics?.data?.analytics[0]?.createdAt ?? new Date()), "h:mm a")}</CardTitle>
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
                      <CardTitle>Analytics</CardTitle>
                      <CardDescription>
                        Your Analytics in this workspace
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Suspense condition={analytics?.data?.analytics.length > 0} fallback={<p className="text-center">No data to display</p>}>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Component</TableHead>
                              <TableHead>Event</TableHead>
                              <TableHead className="hidden md:table-cell">Info</TableHead>
                              <TableHead className="hidden md:table-cell">Status Code</TableHead>
                              <TableHead className="text-right hidden md:table-cell">Date</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {renderAnalytics}
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
