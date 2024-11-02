import Link from "next/link"
import { Equal, DraftingCompass } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/shared/components/ui/sheet"
import { generalUserLinks } from "./data"

export default function Header() {
  return (
    <header className="top-0 flex h-16 items-center gap-4 border-b sticky bg-white px-4 md:px-6 z-50">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          key="home"
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <DraftingCompass className="h-6 w-6" />
        </Link>
        {generalUserLinks.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className={
              item.mainLink ? "text-foreground text-lg" : "text-foreground"
            }
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noopener noreferrer" : ""}
          >
            {item.displayName}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Equal className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <DraftingCompass className="h-6 w-6" />
            </Link>
            {generalUserLinks.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={
                  item.mainLink ? "text-foreground text-lg" : "text-foreground"
                }
                target={item.external ? "_blank" : ""}
                rel={item.external ? "noopener noreferrer" : ""}
              >
                {item.displayName}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto">
          <Link href="/dashboard">
            <Button variant="default">Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
