import { cn } from "@/lib/utils"
import { brandName, uiConstants } from "@/constants/global-constants"

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="bg-slate-50">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose md:text-left">
              © {new Date().getFullYear()} {brandName} {uiConstants.copyrightText}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
