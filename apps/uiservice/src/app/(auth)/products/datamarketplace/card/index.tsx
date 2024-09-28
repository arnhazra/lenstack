import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Circle, Medal, Shield, Star } from "lucide-react"

interface GenericCardProps {
  id: string
  title: string
  desc: string
  category: string
  rating: string
  quality: string
  maturity: string
  handleClick: (id: string) => void
}

export function DatasetCard({ id, title, desc, category, rating, quality, maturity, handleClick }: GenericCardProps) {
  return (
    <Card className="cursor-pointer" onClick={(): void => handleClick(id)}>
      <CardHeader>
        <div className="space-y-1">
          <CardTitle>{title}</CardTitle>
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
            {rating}
          </div>
          <div className="flex items-center">
            <Medal className="mr-1 h-3 w-3 text-cyan-400" />
            {quality}
          </div>
          <div className="flex items-center">
            <Shield className="mr-1 h-3 w-3 fill-green-400 text-green-400" />
            {maturity}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}