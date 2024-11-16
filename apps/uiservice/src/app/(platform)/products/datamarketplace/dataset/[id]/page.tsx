"use client"
import { BookMarked, Copy, Medal } from "lucide-react"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Separator } from "@/shared/components/ui/separator"
import { useRouter } from "next/navigation"
import useQuery from "@/shared/hooks/use-query"
import { endPoints } from "@/shared/constants/api-endpoints"
import HTTPMethods from "@/shared/constants/http-methods"
import Suspense from "@/shared/components/suspense"
import LoadingComponent from "@/shared/components/loading"
import { toast } from "@/shared/components/ui/use-toast"
import { uiConstants } from "@/shared/constants/global-constants"
import ErrorComponent from "@/shared/components/error"
import { DatasetCard } from "../../(components)/dataset-card"
import ActivityLog from "@/shared/components/activity"
import { use } from "react"

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: datasetId } = use(params)
  const router = useRouter()
  const dataset = useQuery(
    ["dataset", datasetId ?? ""],
    `${endPoints.datamarketplaceViewDataset}/${datasetId}`,
    HTTPMethods.GET
  )
  const relatedDatasets = useQuery(
    ["relateddatasets"],
    endPoints.datamarketplaceFindDatasets,
    HTTPMethods.POST,
    {
      searchQuery: "",
      selectedFilter: dataset?.data?.metaData?.category ?? "",
      selectedSortOption: "",
      offset: 0,
    }
  )

  const renderDatasetTags = dataset?.data?.metaData?.description
    ?.split(" ")
    .slice(0, 30)
    .map((item: string, index: number) => {
      if (item.length > 5) {
        return (
          <Badge className="me-2 mb-2" variant="outline" key={index}>
            {item}
          </Badge>
        )
      }
    })

  const copyDatasetId = () => {
    navigator.clipboard.writeText(datasetId ?? "")
    toast({
      title: uiConstants.notification,
      description: (
        <p className="text-slate-600">{uiConstants.copiedToClipBoard}</p>
      ),
    })
  }

  const dataQuality = (rating: number): string => {
    if (rating > 4.5) return "Gold"
    if (rating > 4.0) return "Silver"
    return "Bronze"
  }

  const renderRelatedDatasets = relatedDatasets?.data
    ?.filter((ds: any) => ds?._id !== datasetId)
    .map((ds: any) => {
      return (
        <DatasetCard
          key={ds?._id}
          id={ds?._id}
          title={ds?.name}
          desc={ds?.description}
          category={ds?.category}
          rating={ds?.rating}
          quality={dataQuality(ds?.rating)}
          handleClick={(id: string) =>
            router.push(`/products/datamarketplace/dataset/${id}`)
          }
        />
      )
    })

  return (
    <Suspense
      condition={!dataset.isLoading && !relatedDatasets.isLoading}
      fallback={<LoadingComponent />}
    >
      <Suspense
        condition={!dataset.error && !!datasetId && !relatedDatasets.error}
        fallback={<ErrorComponent />}
      >
        <div className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2 pb-4">
                <CardHeader className="pb-3">
                  <CardTitle className="flex justify-between">
                    {dataset?.data?.metaData?.name}
                    <ActivityLog keyword={datasetId} />
                  </CardTitle>
                  <CardDescription className="max-w-lg justify-normal">
                    {dataset?.data?.metaData?.description}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Dataset Rating</CardDescription>
                  <CardTitle className="text-4xl">
                    {dataset?.data?.metaData?.rating}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Rating of the data
                  </div>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Data Volume</CardDescription>
                  <CardTitle className="text-4xl">
                    {dataset?.data?.dataLength ?? 0}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Volume of data in this dataset
                  </div>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </div>
            <p className="text-xl ms-1 -mb-2 -mt-2">Related Datasets</p>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
              {renderRelatedDatasets}
            </div>
          </div>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  {dataset?.data?.metaData?.name}
                </CardTitle>
                <CardDescription>
                  {dataset?.data?.metaData?.category}
                </CardDescription>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 gap-1"
                  onClick={copyDatasetId}
                >
                  <Copy className="h-3.5 w-3.5" />
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
                    <span className="text-muted-foreground">Data Volume</span>
                    <span>{dataset?.data?.dataLength}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Data Quality</span>
                    <span>
                      <Suspense
                        condition={dataset?.data?.metaData?.rating >= 4.5}
                      >
                        <Badge variant="default" key={"gold"}>
                          <Medal className="scale-50" />
                          Gold
                        </Badge>
                      </Suspense>
                      <Suspense
                        condition={
                          dataset?.data?.metaData?.rating >= 4.0 &&
                          dataset?.data?.metaData?.rating < 4.5
                        }
                      >
                        <Badge variant="secondary" key={"silver"}>
                          <Medal className="scale-50" />
                          Silver
                        </Badge>
                      </Suspense>
                      <Suspense
                        condition={dataset?.data?.metaData?.rating < 4.0}
                      >
                        <Badge variant="outline" key={"bronze"}>
                          <Medal className="scale-50" />
                          Bronze
                        </Badge>
                      </Suspense>
                    </span>
                  </li>
                </ul>
              </div>
              <Separator className="my-4" />
              <div className="grid gap-3">
                <div className="font-semibold text-lg">Dataset Tags</div>
                <div>{renderDatasetTags}</div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-row items-center bg-muted/50 px-6 py-3">
              <Button
                variant="default"
                className="w-full"
                onClick={(): void =>
                  router.push("/apireference/datamarketplace")
                }
              >
                Data API Reference
                <BookMarked className="scale-75" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Suspense>
    </Suspense>
  )
}
