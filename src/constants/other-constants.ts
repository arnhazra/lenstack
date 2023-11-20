import { envConfig } from "src/config/env.config"

export const otherConstants = {
  tokenIssuer: `https://${envConfig.brandName}.vercel.app`,
  polygonScanApiEndpoint: "https://api-testnet.polygonscan.com"
}