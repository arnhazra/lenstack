import { brandName, uiConstants } from "@/constants/global-constants"

interface LinkData {
  displayName: string,
  link: string,
  external?: boolean,
  mainLink?: boolean
}

export const generalUserLinks: LinkData[] = [
  {
    displayName: brandName,
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
    displayName: brandName,
    link: "/dashboard",
    mainLink: true
  },
  {
    displayName: "Privacy",
    link: "/account/privacy"
  },
  {
    displayName: "Sustainability",
    link: "/account/sustainability"
  },
  {
    displayName: "API Reference",
    link: "/apireference/datamarketplace"
  },
]