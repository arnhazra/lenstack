import { buttonVariants } from "@/shared/components/ui/button"
import { brandName, uiConstants } from "@/shared/constants/global-constants"
import { cn } from "@/shared/lib/utils"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="hero space-y-6 pb-8 pt-8 sm:pt-16 sm:py-16 md:pt-16 md:py-16 lg:pt-32 lg:py-32"
    >
      <div className="container flex flex-col gap-4">
        <Link href="" rel="noopener noreferrer">
          <p className="text-sm text-white tracking-normal uppercase">
            {brandName}. {uiConstants.homeBadge}
          </p>
        </Link>
        <h1 className="font-heading text-white text-3xl sm:text-4xl md:text-4xl lg:text-5xl tracking-tight">
          {uiConstants.homeHeader}
        </h1>
        <p className="leading-normal text-white text-xs md:text-md lg:text-lg">
          {uiConstants.homeIntro1}
          <br />
          {uiConstants.homeIntro2}
          <br />
          {uiConstants.homeIntro3}
          <br />
        </p>
        <div className="space-x-4 space-y-4 mt-2">
          <Link
            className={cn(buttonVariants({ variant: "default" }))}
            href="/dashboard"
          >
            Get Started with {brandName}
          </Link>
        </div>
      </div>
    </section>
  )
}
