import { envConfig } from "src/config"

export const devUIUri = "http://localhost:3000"
export const prodUIUri = `https://${envConfig.brandName.toLowerCase()}.vercel.app`
export const devAPIUri = "http://localhost:8000/subscription"
export const prodAPIUri = `https://api-${envConfig.brandName.toLowerCase()}.vercel.app/subscription`
export const tokenIssuer = prodUIUri
