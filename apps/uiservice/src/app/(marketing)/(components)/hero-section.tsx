import { buttonVariants } from "@/shared/components/ui/button"
import { brandName, uiConstants } from "@/shared/constants/global-constants"
import { cn } from "@/shared/lib/utils"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <Link
          href=""
          className="rounded-2xl bg-slate-100 px-4 py-1.5 text-sm font-medium"
        >
          {uiConstants.homeBadge}
        </Link>
        <h1 className="text-slate-800 text-2xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight">
          {uiConstants.homeHeader}
        </h1>
        <p className="max-w-[42rem] leading-normal text-slate-700 sm:text-xl sm:leading-8">
          {uiConstants.homeIntro1}. {uiConstants.homeIntro2}
        </p>
        <Link href="/dashboard" className={cn(buttonVariants({ size: "lg" }))}>
          Get Started with {brandName}
        </Link>
      </div>
    </section>
  )
}
