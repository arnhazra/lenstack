"use client"
import { BookMarked, CopyIcon, Medal, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter, useSearchParams } from "next/navigation"
import useQuery from "@/hooks/use-query"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import Suspense from "@/components/suspense"
import Loading from "@/components/loading"
import Error from "@/components/error"
import { toast } from "@/components/ui/use-toast"
import { uiConstants } from "@/constants/global-constants"

export default function Page() {
  const searchParams = useSearchParams()
  const datasetId = searchParams.get("datasetId")
  const router = useRouter()
  const dataset = useQuery(["dataset"], `${endPoints.datamarketplaceViewDataset}/${datasetId}`, HTTPMethods.GET)
  const relatedDatasets = useQuery(["relateddatasets"], endPoints.datamarketplaceFindDatasets, HTTPMethods.POST, { searchQuery: "", selectedFilter: dataset?.data?.metaData?.category ?? "", selectedSortOption: "", offset: 0 })

  const renderDatasetTags = dataset?.data?.metaData?.description?.split(" ").slice(0, 30).map((item: string, index: number) => {
    if (item.length > 5) {
      return <Badge className="me-2 mb-2" variant="outline" key={index}>{item}</Badge>
    }
  })

  const copyDatasetId = () => {
    navigator.clipboard.writeText(datasetId ?? "")
    toast({
      title: "Notification",
      description: <p className="text-neutral-600">{uiConstants.copiedToClipBoard}</p>
    })
  }

  const renderRelatedDatasets = relatedDatasets?.data?.filter((ds: any) => ds?._id !== datasetId).map((ds: any) => {
    return (
      <TableRow className="cursor-pointer" key={ds?._id} onClick={(): void => router.push(`/products/datamarketplace/dataset?datasetId=${ds._id}`)}>
        <TableCell><div className="font-medium">{ds?.name}</div></TableCell>
        <TableCell className="hidden md:table-cell">{ds?.rating}</TableCell>
        <TableCell>
          <Suspense condition={ds?.rating >= 4.5} fallback={null}>
            <Badge variant="default" key={"gold"}><Medal className="scale-50" />Gold</Badge>
          </Suspense>
          <Suspense condition={ds?.rating >= 4.0 && ds?.rating < 4.5} fallback={null}>
            <Badge variant="secondary" key={"silver"}><Medal className="scale-50" />Silver</Badge>
          </Suspense>
          <Suspense condition={ds?.rating < 4.0} fallback={null}>
            <Badge variant="outline" key={"bronze"}><Medal className="scale-50" />Bronze</Badge >
          </Suspense>
        </TableCell>
        <TableCell className="text-right hidden md:table-cell">
          <Suspense condition={ds?.rating >= 4.2} fallback={null}>
            <Badge variant="default" key={"gold"}><ShieldCheck className="scale-50" />Level 3</Badge>
          </Suspense>
          <Suspense condition={ds?.rating >= 3.6 && ds?.rating < 4.2} fallback={null}>
            <Badge variant="secondary" key={"silver"}><ShieldCheck className="scale-50" />Level 2</Badge>
          </Suspense>
          <Suspense condition={ds?.rating < 3.6} fallback={null}>
            <Badge variant="outline" key={"bronze"}><ShieldCheck className="scale-50" />Level 1</Badge >
          </Suspense>
        </TableCell>
      </TableRow>
    )
  })

  return (
    <Suspense condition={!dataset?.isLoading && !relatedDatasets?.isLoading} fallback={<Loading />}>
      <Suspense condition={!dataset.error && !!datasetId && !relatedDatasets.error} fallback={<div />}>
        <div className="flex min-h-screen w-full flex-col">
          <div className="flex flex-col sm:gap-4 sm:py-4">
            <div className="grid flex-1 items-start gap-4 p-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
              <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                  <Card className="sm:col-span-2 pb-4">
                    <CardHeader className="pb-3">
                      <CardTitle>{dataset?.data?.metaData?.name}</CardTitle>
                      <CardDescription className="max-w-lg justify-normal">
                        {dataset?.data?.metaData?.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Dataset Rating</CardDescription>
                      <CardTitle className="text-4xl">{dataset?.data?.metaData?.rating}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground">
                        Rating of the data
                      </div>
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Data Volume</CardDescription>
                      <CardTitle className="text-4xl">{dataset?.data?.dataLength ?? 0}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground">
                        Volume of data in this dataset
                      </div>
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                  </Card>
                </div>
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Related Datasets</CardTitle>
                    <CardDescription>
                      Datasets of similar category
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Dataset Name</TableHead>
                          <TableHead className="hidden md:table-cell">Dataset Rating</TableHead>
                          <TableHead>Data Quality</TableHead>
                          <TableHead className="text-right hidden md:table-cell">Data Maturity</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {renderRelatedDatasets}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                      {dataset?.data?.metaData?.name}
                    </CardTitle>
                    <CardDescription>{dataset?.data?.metaData?.category}</CardDescription>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <Button size="sm" variant="outline" className="h-8 gap-1" onClick={copyDatasetId}>
                      <CopyIcon className="h-3.5 w-3.5" />
                      <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                        Copy Dataset Id
                      </span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                  <div className="grid gap-3">
                    <div className="font-semibold text-lg">Dataset Details</div>
                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Dataset Rating
                        </span>
                        <span>{dataset?.data?.metaData.rating}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Data Volume
                        </span>
                        <span>{dataset?.data?.dataLength}</span>
                      </li>
                    </ul>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid gap-3">
                    <div className="font-semibold text-lg">Data Quality & Maturity</div>
                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Data Quality
                        </span>
                        <span>
                          <Suspense condition={dataset?.data?.metaData?.rating >= 4.5} fallback={null}>
                            <Badge variant="default" key={"gold"}><Medal className="scale-50" />Gold</Badge>
                          </Suspense>
                          <Suspense condition={dataset?.data?.metaData?.rating >= 4.0 && dataset?.data?.metaData?.rating < 4.5} fallback={null}>
                            <Badge variant="secondary" key={"silver"}><Medal className="scale-50" />Silver</Badge>
                          </Suspense>
                          <Suspense condition={dataset?.data?.metaData?.rating < 4.0} fallback={null}>
                            <Badge variant="outline" key={"bronze"}><Medal className="scale-50" />Bronze</Badge >
                          </Suspense>
                        </span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Data Maturity
                        </span>
                        <span>
                          <Suspense condition={dataset?.data?.metaData?.rating >= 4.2} fallback={null}>
                            <Badge variant="default" key={"gold"}><ShieldCheck className="scale-50" />Level 3</Badge>
                          </Suspense>
                          <Suspense condition={dataset?.data?.metaData?.rating >= 3.6 && dataset?.data?.metaData?.rating < 4.2} fallback={null}>
                            <Badge variant="secondary" key={"silver"}><ShieldCheck className="scale-50" />Level 2</Badge>
                          </Suspense>
                          <Suspense condition={dataset?.data?.metaData?.rating < 3.6} fallback={null}>
                            <Badge variant="outline" key={"bronze"}><ShieldCheck className="scale-50" />Level 1</Badge >
                          </Suspense>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid gap-3">
                    <div className="font-semibold text-lg">Dataset Tags</div>
                    <div>
                      {renderDatasetTags}
                    </div>
                  </div>
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
