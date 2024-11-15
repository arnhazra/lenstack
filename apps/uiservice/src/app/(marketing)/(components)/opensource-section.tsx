import { uiConstants } from "@/shared/constants/global-constants"
import { Github } from "lucide-react"
import Link from "next/link"

export default function OpenSourceSection() {
  return (
    <section id="opensource" className="container py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Open Source
        </h2>
        <p className="max-w-[85%] leading-normal text-slate-600 sm:text-lg sm:leading-7">
          {uiConstants.openSourceHeader} <br /> The code is available on{" "}
          <Link
            href={uiConstants.githubRepoUri}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            GitHub
          </Link>
          .{" "}
        </p>
        <Link
          href={uiConstants.githubRepoUri}
          target="_blank"
          rel="noreferrer"
          className="flex"
        >
          <div className="flex h-10 w-10 items-center justify-center space-x-2 rounded-md border border-muted bg-muted">
            <Github />
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 border-y-8 border-l-0 border-r-8 border-solid border-muted border-y-transparent"></div>
            <div className="flex h-10 items-center rounded-md border border-muted bg-muted px-4 font-medium">
              {""} stars on GitHub
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
