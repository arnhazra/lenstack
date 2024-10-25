import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import { Light as SyntaxHighlighter } from "react-syntax-highlighter"
import { stackoverflowLight } from "react-syntax-highlighter/dist/esm/styles/hljs"

export function DataModal({ dataObj }: { dataObj: any }) {
	const { _id, createdAt } = dataObj

	return (
		<Dialog>
			<DialogTrigger asChild>
				<p>View Data</p>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>View Data</DialogTitle>
					<DialogDescription>
						This data was created on{" "}
						{format(new Date(createdAt), "MMM, do yyyy, h:mm a")}
					</DialogDescription>
				</DialogHeader>
				<div className="gap-4 py-4">
					<div className="items-center gap-4">
						<Label htmlFor="name" className="text-right pb-3">
							Id
						</Label>
						<Input
							id="name"
							disabled
							defaultValue={_id}
							className="col-span-3"
						/>
					</div>
					<div className="items-center gap-4">
						<Label htmlFor="username" className="text-right">
							Data
						</Label>
						<SyntaxHighlighter
							wrapLongLines
							language="json"
							style={stackoverflowLight}
							customStyle={{ maxHeight: "15rem" }}
						>
							{JSON.stringify(dataObj ?? {}, null, 2)}
						</SyntaxHighlighter>
					</div>
				</div>
				<DialogFooter>
					<DialogTrigger asChild>
						<Button variant="secondary">Close</Button>
					</DialogTrigger>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
