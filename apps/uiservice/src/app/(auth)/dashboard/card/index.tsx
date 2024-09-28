import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { brandName, uiConstants } from "@/constants/global-constants"
import { Circle, Medal, Star } from "lucide-react"

interface GenericCardProps {
  productName: string
  displayName: string
  desc: string
  category: string
  status: string
  handleClick: (productName: string) => void
}

export function ProductCard({ productName, status, displayName, desc, category, handleClick }: GenericCardProps) {
  return (
    <Card className="cursor-pointer" onClick={(): void => handleClick(productName)}>
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="text-xl">{brandName} {displayName}</CardTitle>
          <CardDescription>
            {desc}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Circle className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
            {category}
          </div>
          <div className="flex items-center">
            <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
            {status}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}