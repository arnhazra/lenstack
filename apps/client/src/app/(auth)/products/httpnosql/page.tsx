"use client"
import Error from "@/components/error"
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
  const dataList = useQuery(["datalist"], `${endPoints.httpnosqlReadData}`, HTTPMethods.GET)
  const products = useQuery(["products"], `${endPoints.getProductConfig}?searchQuery=httpnosql&category=All`, HTTPMethods.GET)
  const selectedProduct = products?.data?.find((product: any) => product.productName === "httpnosql")
  const router = useRouter()

  const renderData = dataList?.data?.map((data: any) => {
    return (
      <TableRow className="cursor-pointer" key={data._id}>
        <TableCell><div className="font-medium">{data?.key}</div></TableCell>
        <TableCell className="text-neutral-500">{data?.value}</TableCell>
        <TableCell className="text-right text-neutral-500 hidden md:table-cell">{format(new Date(data.createdAt), "MMM, do yyyy, h:mm a")}</TableCell>
      </TableRow>
    )
  })

  return (
    <Suspense condition={!dataList.isLoading && !products.isLoading} fallback={<Loading />}>
      <Suspense condition={!dataList.error && !products.error} fallback={<Error />}>
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
                  <Button onClick={(): void => router.push(`/apireference?tab=httpNosql`)}>API Reference</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Metrics Count</CardDescription>
                  <CardTitle className="text-4xl">{dataList?.data?.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Total number of events
                    in this organization
                  </div>
                </CardContent>
                <CardFooter>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Latest Event</CardDescription>
                  <Suspense condition={dataList?.data?.length > 0} fallback={<CardTitle className="text-xl">No Data</CardTitle>}>
                    <CardTitle className="text-xl">{format(new Date(dataList?.data?.length ? dataList?.data[0]?.createdAt : new Date()), "MMM, do yyyy")}</CardTitle>
                    <CardTitle className="text-xl">{format(new Date(dataList?.data?.length ? dataList?.data[0]?.createdAt : new Date()), "h:mm a")}</CardTitle>
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
            <Card>
              <CardHeader className="px-7">
                <CardTitle>Database</CardTitle>
                <CardDescription>
                  Your Datalist list in this organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense condition={dataList?.data?.length > 0} fallback={<p className="text-center">No data to display</p>}>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Key</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead className="text-right hidden md:table-cell">Created At</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {renderData}
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
