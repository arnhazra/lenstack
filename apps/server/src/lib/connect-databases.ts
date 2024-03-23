import { Connection, createConnection } from "mongoose"
import { envConfig } from "../env.config"

export const platformDatabaseConn: Connection = createConnection(envConfig.platformDatabaseURI)
export const analyticsDatabaseConn: Connection = createConnection(envConfig.analyticsDatabaseURI)
export const copilotDatabaseConn: Connection = createConnection(envConfig.copilotDatabaseURI)
export const dataexchangeDatabaseConn: Connection = createConnection(envConfig.dataexchangeDatabaseURI)
export const kvstoreDatabaseConn = createConnection(envConfig.kvstoreDatabaseURI)
export const ledgerscanDatabaseConn: Connection = createConnection(envConfig.ledgerscanDatabaseURI)
export const nftstudioDatabaseConn: Connection = createConnection(envConfig.nftstudioDatabaseURI)
export const swapDatabaseConn: Connection = createConnection(envConfig.swapDatabaseURI)
export const walletDatabaseConn: Connection = createConnection(envConfig.walletDatabaseURI)

async function platformDatabaseConnect(): Promise<void> {
  platformDatabaseConn.on("connected", () => console.log("Platform Database Connected"))
  platformDatabaseConn.on("error", () => console.log("Platform Database Not Connected"))
}

async function analyticsDatabaseConnect(): Promise<void> {
  analyticsDatabaseConn.on("connected", () => console.log("Analytics Database Connected"))
  analyticsDatabaseConn.on("error", () => console.log("Analytics Database Not Connected"))
}

async function copilotDatabaseConnect(): Promise<void> {
  copilotDatabaseConn.on("connected", () => console.log("Copilot Database Connected"))
  copilotDatabaseConn.on("error", () => console.log("Copilot Database Not Connected"))
}

async function dataexchangeDatabaseConnect(): Promise<void> {
  dataexchangeDatabaseConn.on("connected", () => console.log("Data Exchange Database Connected"))
  dataexchangeDatabaseConn.on("error", () => console.log("Data Exchange Database Not Connected"))
}

async function walletDatabaseConnect(): Promise<void> {
  walletDatabaseConn.on("connected", () => console.log("Wallet Database Connected"))
  walletDatabaseConn.on("error", () => console.log("Wallet Database Not Connected"))
}

async function nftstudioDatabaseConnect(): Promise<void> {
  nftstudioDatabaseConn.on("connected", () => console.log("NFT Studio Database Connected"))
  nftstudioDatabaseConn.on("error", () => console.log("NFT Studio Database Not Connected"))
}

async function swapDatabaseConnect(): Promise<void> {
  swapDatabaseConn.on("connected", () => console.log("Swap Database Connected"))
  swapDatabaseConn.on("error", () => console.log("Swap Database Not Connected"))
}

async function kvstoreDatabaseConnect(): Promise<void> {
  kvstoreDatabaseConn.on("connected", () => console.log("KV Store Database Connected"))
  kvstoreDatabaseConn.on("error", () => console.log("KV Store Database Not Connected"))
}

async function ledgerscanDatabaseConnect(): Promise<void> {
  ledgerscanDatabaseConn.on("connected", () => console.log("Ledgerscan Database Connected"))
  ledgerscanDatabaseConn.on("error", () => console.log("Ledgerscan Database Not Connected"))
}

export async function connectDatabases(): Promise<void> {
  platformDatabaseConnect()
  analyticsDatabaseConnect()
  copilotDatabaseConnect()
  dataexchangeDatabaseConnect()
  walletDatabaseConnect()
  nftstudioDatabaseConnect()
  swapDatabaseConnect()
  kvstoreDatabaseConnect()
  ledgerscanDatabaseConnect()
}