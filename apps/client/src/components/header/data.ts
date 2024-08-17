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
    displayName: "Subscription",
    link: "/subscription"
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