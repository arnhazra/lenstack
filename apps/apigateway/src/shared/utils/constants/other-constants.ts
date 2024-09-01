import { envConfig } from "src/env.config"

export const otherConstants = {
  tokenIssuer: `https://${envConfig.brandName}.vercel.app`,
  stripeRedirectUriDev: "http://localhost:3000/dashboard",
  stripeRedirectUriProd: `https://${envConfig.brandName}.vercel.app/dashboard`,
  stripeConfigBaseUriDev: "http://localhost:8000/api/pricing",
  stripeConfigBaseUriProd: `https://${envConfig.brandName}.vercel.app/api/pricing`
}