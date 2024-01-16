import { envConfig } from "src/env.config"

export const otherConstants: Record<string, string> = {
  tokenIssuer: `https://${envConfig.brandName}.vercel.app`,
  polygonScanApiEndpoint: "https://api-testnet.polygonscan.com"
}