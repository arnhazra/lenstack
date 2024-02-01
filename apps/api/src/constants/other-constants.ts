import { envConfig } from "src/env.config"

export const otherConstants = {
  tokenIssuer: `https://${envConfig.brandName}.vercel.app`,
  polygonScanApiEndpoint: "https://api-testnet.polygonscan.com"
}