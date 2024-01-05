import { envConfig } from "src/config/env.config"

export const otherConstants: Record<string, string> = {
  tokenIssuer: `https://${envConfig.brandName}.vercel.app`,
  polygonScanApiEndpoint: "https://api-testnet.polygonscan.com"
}