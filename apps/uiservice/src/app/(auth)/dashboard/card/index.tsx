import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { brandName, uiConstants } from "@/constants/global-constants"
import { Box, Circle, Medal, Star } from "lucide-react"

interface GenericCardProps {
  productName: string
  displayName: string
  desc: string
  category: string
  status: string
  handleClick: (productName: string) => void
  productIcon: string
}

export function ProductCard({ productName, status, displayName, desc, category, handleClick, productIcon }: GenericCardProps) {
  return (
    <Card className="cursor-pointer" onClick={(): void => handleClick(productName)}>
      <CardHeader>
        <div className="space-y-1">
          <div className="flex justify-between">
            <CardTitle className="text-xl">{brandName} {displayName}</CardTitle>
            <div className="scale-75" dangerouslySetInnerHTML={{ __html: productIcon }} />
          </div>
          <CardDescription>
            {desc}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Box className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
            {category}
          </div>
          <div className="flex items-center">
            <Circle className="mr-1 h-3 w-3 fill-green-400 text-green-400" />
            {status}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}