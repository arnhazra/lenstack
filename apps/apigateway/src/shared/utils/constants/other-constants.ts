import { envConfig } from "src/env.config"

export const otherConstants = {
  tokenIssuer: `https://${envConfig.brandName.toLowerCase()}.vercel.app`,
  stripeRedirectUriDev: "http://localhost:3000/dashboard",
  stripeRedirectUriProd: `https://${envConfig.brandName.toLowerCase()}.vercel.app/dashboard`,
  stripeConfigBaseUriDev: "http://localhost:8000/pricing",
  stripeConfigBaseUriProd: `https://${envConfig.brandName.toLowerCase()}.vercel.app/pricing`
}