"use client"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { buttonVariants } from "@/shared/components/ui/button"
import Link from "next/link"
import { cn } from "@/shared/lib/utils"

export default function NotFound() {
  return (
    <div className="fixed inset-0 overflow-y-auto flex justify-center items-center auth-landing">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Not Found</CardTitle>
          <CardDescription>
            Seems like there is nothing what you are looking for
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link
            href="/dashboard"
            className={`w-full ${cn(buttonVariants({ variant: "default" }))}`}
          >
            Go Back
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
