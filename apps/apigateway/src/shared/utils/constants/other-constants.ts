import { envConfig } from "src/env.config"

export const devUIUri = "http://localhost:3000"
export const prodUIUri = `https://${envConfig.brandName.toLowerCase()}.vercel.app`

export const otherConstants = {
	tokenIssuer: devUIUri,
	stripeRedirectUriDev: `${devUIUri}/dashboard`,
	stripeRedirectUriProd: `${prodUIUri}/dashboard`,
	stripeConfigBaseUriDev: "http://localhost:8000/pricing",
	stripeConfigBaseUriProd: `https://api-${envConfig.brandName.toLowerCase()}.vercel.app/pricing`,
}
