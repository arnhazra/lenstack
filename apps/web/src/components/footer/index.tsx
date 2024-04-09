"use client"
import { cn } from "@/lib/utils"
import { uiConstants } from "@/constants/global-constants"
import { usePathname } from "next/navigation"

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  const pathName = usePathname()
  return (
    <footer className={cn(className)}>
      <div className={pathName === "/" ? "" : "bg-slate-50"}>
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose md:text-left">
              Built by{" "}
              <a
                href={uiConstants.linkedinUri}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                arnhazra
              </a>
              . Hosted on{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                Vercel
              </a>
              . The source code is available on{" "}
              <a
                href={uiConstants.githubRepoUri}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
