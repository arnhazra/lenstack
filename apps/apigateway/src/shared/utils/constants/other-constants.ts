import { envConfig } from "src/env.config"

export const devUri = "http://localhost:3000"
export const prodUri = `https://${envConfig.brandName.toLowerCase()}.vercel.app`

export const otherConstants = {
  tokenIssuer: prodUri,
  stripeRedirectUriDev: `${devUri}/dashboard`,
  stripeRedirectUriProd: `${prodUri}/dashboard`,
  stripeConfigBaseUriDev: "http://localhost:8000/pricing",
  stripeConfigBaseUriProd: `https://api-${envConfig.brandName.toLowerCase()}.vercel.app/pricing`
}