"use client"
import Link from "next/link"
import { CircleUser, Hexagon, Equal, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { authUserLinks, generalUserLinks } from "./data"
import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import { useDebounce, } from "@uidotdev/usehooks"
import Suspense from "../suspense"

export default function Header() {
  const searchRef = useRef<HTMLInputElement | null>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [{ userState }, dispatch] = useContext(GlobalContext)
  const [searchString, setSearchString] = useState("")
  const debouncedSearchTerm = useDebounce(searchString, 1000)
  const router = useRouter()

  useEffect(() => {
    dispatch("setAppState", { globalSearchString: "" })

    if (searchRef && searchRef.current) {
      searchRef.current.value = ""
    }

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.altKey && event.key.toLowerCase() === "q" && searchRef.current) {
        event.preventDefault()
        searchRef.current.focus()
      }
    }

    window.addEventListener("keydown", handleKeyPress)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [pathname, searchParams])

  useEffect(() => {
    dispatch("setAppState", { globalSearchString: debouncedSearchTerm })
  }, [debouncedSearchTerm])

  return (
    <Fragment>
      <Suspense condition={userState.isAuthorized} fallback={null}>
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6 z-50">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base"><Hexagon className="h-6 w-6" /></Link>
            {authUserLinks.map((item) =>
              <Link href={item.link} className={item.mainLink ? "text-foreground text-lg" : "text-foreground"} target={item.external ? "_blank" : ""} rel={item.external ? "noopener noreferrer" : ""}>
                {item.displayName}
              </Link>
            )}
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Equal className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="#" className="flex items-center gap-2 text-lg font-semibold"><Hexagon className="h-6 w-6" /></Link>
                {authUserLinks.map((item) =>
                  <Link href={item.link} className={item.mainLink ? "text-foreground text-lg" : "text-foreground"} target={item.external ? "_blank" : ""} rel={item.external ? "noopener noreferrer" : ""}>
                    {item.displayName}
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  ref={searchRef}
                  onChange={(e): void => setSearchString(e.target.value)}
                  type="search"
                  placeholder="Press (Alt + Q) or click to search"
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <CircleUser className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      </Suspense>
      <Suspense condition={!userState.isAuthorized} fallback={null}>
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6 z-50">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base"><Hexagon className="h-6 w-6" /></Link>
            {generalUserLinks.map((item) =>
              <Link href={item.link} className={item.mainLink ? "text-foreground text-lg" : "text-foreground"} target={item.external ? "_blank" : ""} rel={item.external ? "noopener noreferrer" : ""}>
                {item.displayName}
              </Link>
            )}
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Equal className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="#" className="flex items-center gap-2 text-lg font-semibold"><Hexagon className="h-6 w-6" /></Link>
                {generalUserLinks.map((item) =>
                  <Link href={item.link} className={item.mainLink ? "text-foreground text-lg" : "text-foreground"} target={item.external ? "_blank" : ""} rel={item.external ? "noopener noreferrer" : ""}>
                    {item.displayName}
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <div className="ml-auto">
              <Button variant="default" onClick={(): void => router.push("/dashboard")}>
                Get Started
              </Button>
            </div>
          </div>
        </header>
      </Suspense>
    </Fragment>
  )
}
