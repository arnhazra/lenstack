"use client"
import ErrorComponent from "@/components/error"
import LoadingComponent from "@/components/loading"
import Suspense from "@/components/suspense"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { endPoints } from "@/constants/api-endpoints"
import HTTPMethods from "@/constants/http-methods"
import useQuery from "@/hooks/use-query"
import { format } from "date-fns"
import { DataModal } from "@/components/datamodal"

export default function Page() {
	const webAnalytics = useQuery(
		["webanalytics"],
		endPoints.webanalyticsView,
		HTTPMethods.GET
	)

	const renderAnalytics = webAnalytics?.data?.map((event: any, id: number) => {
		return (
			<TableRow className="cursor-pointer" key={event._id}>
				<TableCell>{id + 1}</TableCell>
				<TableCell>
					{format(new Date(event.createdAt), "MMM, do yyyy, h:mm a")}
				</TableCell>
				<TableCell className="text-right md:table-cell">
					<DataModal dataObj={event} />
				</TableCell>
			</TableRow>
		)
	})

	return (
		<Suspense
			condition={!webAnalytics.isLoading}
			fallback={<LoadingComponent />}
		>
			<Suspense condition={!webAnalytics.error} fallback={<ErrorComponent />}>
				<Card className="xl:col-span-2">
					<CardHeader className="px-7">
						<CardTitle>Web Analytics</CardTitle>
						<CardDescription>
							Your Web Analytics in this organization
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Suspense
							condition={webAnalytics?.data?.length > 0}
							fallback={<p className="text-center">No data to display</p>}
						>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Event No</TableHead>
										<TableHead>Date</TableHead>
										<TableHead className="text-right md:table-cell">
											View
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>{renderAnalytics}</TableBody>
							</Table>
						</Suspense>
					</CardContent>
				</Card>
			</Suspense>
		</Suspense>
	)
}
