"use client"
import { Button } from "@/shared/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/shared/components/ui/card"

export default function Error() {
  return (
    <div className="fixed inset-0 overflow-y-auto flex justify-center items-center auth-landing">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Error</CardTitle>
          <CardDescription>
            Seems like an error occured here, click retry
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            size="lg"
            className="w-full"
            onClick={(): void => window.location.reload()}
          >
            Retry
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
