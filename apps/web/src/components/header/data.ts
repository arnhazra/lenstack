import { uiConstants } from "@/constants/global-constants"

interface LinkData {
  displayName: string,
  link: string,
  external?: boolean,
  mainLink?: boolean
}

export const generalUserLinks: LinkData[] = [
  {
    displayName: uiConstants.brandName,
    link: "/",
    mainLink: true
  },
  {
    displayName: "Products",
    link: "/#products"
  },
  {
    displayName: "Solutions",
    link: "/#solutions"
  },
  {
    displayName: "Pricing",
    link: "/#pricing"
  },
  {
    displayName: "Developer",
    link: "https://www.linkedin.com/in/arnhazra",
    external: true
  }
]

export const authUserLinks: LinkData[] = [
  {
    displayName: uiConstants.brandName,
    link: "/dashboard",
    mainLink: true
  },
  {
    displayName: "Workspace",
    link: "/workspace",
  },
  {
    displayName: "Plans",
    link: "/subscription/plans"
  },
  {
    displayName: "Docs",
    link: "/apireference"
  },
  {
    displayName: "Faucet",
    link: "https://faucet.polygon.technology/",
    external: true
  }
]

export const searchEnabledPathNames = [
  "/products",
  "/products/dataexchange",
  "/products/nftstudio",
  "/products/swap",
  "/products/",
  "/products/dataexchange/",
  "/products/nftstudio/",
  "/products/swap/"
]