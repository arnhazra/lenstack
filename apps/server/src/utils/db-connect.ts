import mongoose, { Connection } from "mongoose"
import { envConfig } from "../env.config"

export const platformMongoDbConn: Connection = mongoose.createConnection(envConfig.platformDbUri)
export const copilotMongoDbConn: Connection = mongoose.createConnection(envConfig.copilotDbURI)
export const datalakeMongoDbConn: Connection = mongoose.createConnection(envConfig.datalakeDbURI)
export const walletMongoDbConn: Connection = mongoose.createConnection(envConfig.walletDbURI)
export const insightsMongoDbConn: Connection = mongoose.createConnection(envConfig.insightsDbURI)
export const nftstudioMongoDbConn: Connection = mongoose.createConnection(envConfig.nftstudioDbURI)
export const swapMongoDbConn: Connection = mongoose.createConnection(envConfig.swapDbURI)
export const fabricMongoDbConn = mongoose.createConnection(envConfig.fabricDbURI)
export const ledgerscanMongoDbConn: Connection = mongoose.createConnection(envConfig.ledgerscanDbURI)

async function platformDbConnect(): Promise<void> {
  platformMongoDbConn.on("connected", () => console.log("Platform DB Connected"))
  platformMongoDbConn.on("error", () => console.log("Platform DB Not Connected"))
}

async function copilotDbConnect(): Promise<void> {
  copilotMongoDbConn.on("connected", () => console.log("Copilot DB Connected"))
  copilotMongoDbConn.on("error", () => console.log("Copilot DB Not Connected"))
}

async function datalakeDbConnect(): Promise<void> {
  datalakeMongoDbConn.on("connected", () => console.log("Datalake DB Connected"))
  datalakeMongoDbConn.on("error", () => console.log("Datalake DB Not Connected"))
}

async function walletDbConnect(): Promise<void> {
  walletMongoDbConn.on("connected", () => console.log("Wallet DB Connected"))
  walletMongoDbConn.on("error", () => console.log("Wallet DB Not Connected"))
}

async function insightsDbConnect(): Promise<void> {
  insightsMongoDbConn.on("connected", () => console.log("Insights DB Connected"))
  insightsMongoDbConn.on("error", () => console.log("Insights DB Not Connected"))
}

async function nftstudioDbConnect(): Promise<void> {
  nftstudioMongoDbConn.on("connected", () => console.log("NFT Studio DB Connected"))
  nftstudioMongoDbConn.on("error", () => console.log("NFT Studio DB Not Connected"))
}

async function swapDbConnect(): Promise<void> {
  swapMongoDbConn.on("connected", () => console.log("Swap DB Connected"))
  swapMongoDbConn.on("error", () => console.log("Swap DB Not Connected"))
}

async function fabricDbConnect(): Promise<void> {
  fabricMongoDbConn.on("connected", () => console.log("Fabric DB Connected"))
  fabricMongoDbConn.on("error", () => console.log("Fabric DB Not Connected"))
}

async function ledgerscanDbConnect(): Promise<void> {
  ledgerscanMongoDbConn.on("connected", () => console.log("Ledgerscan DB Connected"))
  ledgerscanMongoDbConn.on("error", () => console.log("Ledgerscan DB Not Connected"))
}

export async function dbConnect(): Promise<void> {
  platformDbConnect()
  copilotDbConnect()
  datalakeDbConnect()
  walletDbConnect()
  insightsDbConnect()
  nftstudioDbConnect()
  swapDbConnect()
  fabricDbConnect()
  ledgerscanDbConnect()
}