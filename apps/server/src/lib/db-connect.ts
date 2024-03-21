import { Connection, createConnection } from "mongoose"
import { envConfig } from "../env.config"

export const platformDatabaseConn: Connection = createConnection(envConfig.platformDbURI)
export const analyticsDatabaseConn: Connection = createConnection(envConfig.analyticsDbURI)
export const copilotDatabaseConn: Connection = createConnection(envConfig.copilotDbURI)
export const dataexchangeDatabaseConn: Connection = createConnection(envConfig.dataexchangeDbURI)
export const walletDatabaseConn: Connection = createConnection(envConfig.walletDbURI)
export const nftstudioDatabaseConn: Connection = createConnection(envConfig.nftstudioDbURI)
export const swapDatabaseConn: Connection = createConnection(envConfig.swapDbURI)
export const kvstoreDatabaseConn = createConnection(envConfig.kvstoreDbURI)
export const ledgerscanDatabaseConn: Connection = createConnection(envConfig.ledgerscanDbURI)

async function platformDbConnect(): Promise<void> {
  platformDatabaseConn.on("connected", () => console.log("Platform DB Connected"))
  platformDatabaseConn.on("error", () => console.log("Platform DB Not Connected"))
}

async function analyticsDbConnect(): Promise<void> {
  analyticsDatabaseConn.on("connected", () => console.log("Analytics DB Connected"))
  analyticsDatabaseConn.on("error", () => console.log("Analytics DB Not Connected"))
}

async function copilotDbConnect(): Promise<void> {
  copilotDatabaseConn.on("connected", () => console.log("Copilot DB Connected"))
  copilotDatabaseConn.on("error", () => console.log("Copilot DB Not Connected"))
}

async function dataexchangeDbConnect(): Promise<void> {
  dataexchangeDatabaseConn.on("connected", () => console.log("Data Exchange DB Connected"))
  dataexchangeDatabaseConn.on("error", () => console.log("Data Exchange DB Not Connected"))
}

async function walletDbConnect(): Promise<void> {
  walletDatabaseConn.on("connected", () => console.log("Wallet DB Connected"))
  walletDatabaseConn.on("error", () => console.log("Wallet DB Not Connected"))
}

async function nftstudioDbConnect(): Promise<void> {
  nftstudioDatabaseConn.on("connected", () => console.log("NFT Studio DB Connected"))
  nftstudioDatabaseConn.on("error", () => console.log("NFT Studio DB Not Connected"))
}

async function swapDbConnect(): Promise<void> {
  swapDatabaseConn.on("connected", () => console.log("Swap DB Connected"))
  swapDatabaseConn.on("error", () => console.log("Swap DB Not Connected"))
}

async function kvstoreDbConnect(): Promise<void> {
  kvstoreDatabaseConn.on("connected", () => console.log("KV Store DB Connected"))
  kvstoreDatabaseConn.on("error", () => console.log("KV Store DB Not Connected"))
}

async function ledgerscanDbConnect(): Promise<void> {
  ledgerscanDatabaseConn.on("connected", () => console.log("Ledgerscan DB Connected"))
  ledgerscanDatabaseConn.on("error", () => console.log("Ledgerscan DB Not Connected"))
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