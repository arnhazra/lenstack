"use client"
import Link from "next/link"
import { CircleUser, Equal, DraftingCompass } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { authUserLinks, generalUserLinks } from "./data"
import { Fragment, useContext, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { GlobalContext } from "@/context/providers/globalstate.provider"
import Suspense from "../suspense"
import { OrgSwitcher } from "../orgswitcher"

export default function Header() {
  const pathname = usePathname()
  const [{ userState }] = useContext(GlobalContext)
  const router = useRouter()

  const signOut = async () => {
    localStorage.clear()
    window.location.replace("/")
  }

  return (
    <Fragment>
      <Suspense condition={userState.isAuthorized} fallback={null}>
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6 z-50">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link key="dashboard" href="/dashboard" className="flex items-center gap-2 text-lg font-semibold md:text-base"><DraftingCompass className="h-6 w-6" /></Link>
            {authUserLinks.map((item, index) =>
              <Link key={index} href={item.link} className={item.mainLink ? "whitespace-nowrap text-foreground text-lg" : "whitespace-nowrap text-foreground"} target={item.external ? "_blank" : ""} rel={item.external ? "noopener noreferrer" : ""}>
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
                <Link key="dashboard" href="/dashboard" className="flex items-center gap-2 text-lg font-semibold"><DraftingCompass className="h-6 w-6" /></Link>
                {authUserLinks.map((item, index) =>
                  <Link key={index} href={item.link} className={item.mainLink ? "text-foreground text-lg" : "text-foreground"} target={item.external ? "_blank" : ""} rel={item.external ? "noopener noreferrer" : ""}>
                    {item.displayName}
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <OrgSwitcher />
              </div>
            </form>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <CircleUser className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(): void => router.push("/account/user")}>My Account</DropdownMenuItem>
                <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      </Suspense>
      <Suspense condition={!userState.isAuthorized} fallback={null}>
        <header className={`top-0 flex h-16 items-center gap-4 ${pathname !== "/" ? "border-b sticky" : ""} bg-white px-4 md:px-6 z-50`}>
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link key="home" href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base"><DraftingCompass className="h-6 w-6" /></Link>
            {generalUserLinks.map((item, index) =>
              <Link key={index} href={item.link} className={item.mainLink ? "text-foreground text-lg" : "text-foreground"} target={item.external ? "_blank" : ""} rel={item.external ? "noopener noreferrer" : ""}>
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
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold"><DraftingCompass className="h-6 w-6" /></Link>
                {generalUserLinks.map((item, index) =>
                  <Link key={index} href={item.link} className={item.mainLink ? "text-foreground text-lg" : "text-foreground"} target={item.external ? "_blank" : ""} rel={item.external ? "noopener noreferrer" : ""}>
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