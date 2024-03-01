import mongoose, { Connection } from "mongoose"
import { envConfig } from "../env.config"

export const platformMongoDbConn: Connection = mongoose.createConnection(envConfig.platformDbURI)
export const analyticsMongoDbConn: Connection = mongoose.createConnection(envConfig.analyticsDbURI)
export const copilotMongoDbConn: Connection = mongoose.createConnection(envConfig.copilotDbURI)
export const dataexchangeMongoDbConn: Connection = mongoose.createConnection(envConfig.dataexchangeDbURI)
export const walletMongoDbConn: Connection = mongoose.createConnection(envConfig.walletDbURI)
export const nftstudioMongoDbConn: Connection = mongoose.createConnection(envConfig.nftstudioDbURI)
export const swapMongoDbConn: Connection = mongoose.createConnection(envConfig.swapDbURI)
export const kvstoreMongoDbConn = mongoose.createConnection(envConfig.kvstoreDbURI)
export const ledgerscanMongoDbConn: Connection = mongoose.createConnection(envConfig.ledgerscanDbURI)

async function platformDbConnect(): Promise<void> {
  platformMongoDbConn.on("connected", () => console.log("Platform DB Connected"))
  platformMongoDbConn.on("error", () => console.log("Platform DB Not Connected"))
}

async function analyticsDbConnect(): Promise<void> {
  analyticsMongoDbConn.on("connected", () => console.log("Analytics DB Connected"))
  analyticsMongoDbConn.on("error", () => console.log("Analytics DB Not Connected"))
}

async function copilotDbConnect(): Promise<void> {
  copilotMongoDbConn.on("connected", () => console.log("Copilot DB Connected"))
  copilotMongoDbConn.on("error", () => console.log("Copilot DB Not Connected"))
}

async function dataexchangeDbConnect(): Promise<void> {
  dataexchangeMongoDbConn.on("connected", () => console.log("Data Exchange DB Connected"))
  dataexchangeMongoDbConn.on("error", () => console.log("Data Exchange DB Not Connected"))
}

async function walletDbConnect(): Promise<void> {
  walletMongoDbConn.on("connected", () => console.log("Wallet DB Connected"))
  walletMongoDbConn.on("error", () => console.log("Wallet DB Not Connected"))
}

async function nftstudioDbConnect(): Promise<void> {
  nftstudioMongoDbConn.on("connected", () => console.log("NFT Studio DB Connected"))
  nftstudioMongoDbConn.on("error", () => console.log("NFT Studio DB Not Connected"))
}

async function swapDbConnect(): Promise<void> {
  swapMongoDbConn.on("connected", () => console.log("Swap DB Connected"))
  swapMongoDbConn.on("error", () => console.log("Swap DB Not Connected"))
}

async function kvstoreDbConnect(): Promise<void> {
  kvstoreMongoDbConn.on("connected", () => console.log("KV Store DB Connected"))
  kvstoreMongoDbConn.on("error", () => console.log("KV Store DB Not Connected"))
}

async function ledgerscanDbConnect(): Promise<void> {
  ledgerscanMongoDbConn.on("connected", () => console.log("Ledgerscan DB Connected"))
  ledgerscanMongoDbConn.on("error", () => console.log("Ledgerscan DB Not Connected"))
}

export async function dbConnect(): Promise<void> {
  platformDbConnect()
  analyticsDbConnect()
  copilotDbConnect()
  dataexchangeDbConnect()
  walletDbConnect()
  nftstudioDbConnect()
  swapDbConnect()
  kvstoreDbConnect()
  ledgerscanDbConnect()
}