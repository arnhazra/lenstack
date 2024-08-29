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
    displayName: "Solutions",
    link: "/#solutions"
  },
  {
    displayName: "Products",
    link: "/#products"
  },
  {
    displayName: "Pricing",
    link: "/#pricing"
  },
  {
    displayName: "Developer",
    link: uiConstants.linkedinUri,
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
    displayName: "Wallet",
    link: "/account?tab=wallet"
  },
  {
    displayName: "Organization",
    link: "/account?tab=organization"
  },
  {
    displayName: "API Reference",
    link: "/apireference"
  },
]

export const searchEnabledPathNames = [
  "/dashboard",
  "/products/datamarketplace",
  "/dashboard/",
  "/products/datamarketplace/",
]