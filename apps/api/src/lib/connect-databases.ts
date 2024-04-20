import { Connection, createConnection } from "mongoose"
import { envConfig } from "../env.config"

export const platformDatabaseConn: Connection = createConnection(envConfig.platformDatabaseURI)
export const analyticsDatabaseConn: Connection = createConnection(envConfig.analyticsDatabaseURI)
export const copilotDatabaseConn: Connection = createConnection(envConfig.copilotDatabaseURI)
export const dataexchangeDatabaseConn: Connection = createConnection(envConfig.dataexchangeDatabaseURI)
export const kvstoreDatabaseConn = createConnection(envConfig.kvstoreDatabaseURI)
export const nftstudioDatabaseConn: Connection = createConnection(envConfig.nftstudioDatabaseURI)
export const swapDatabaseConn: Connection = createConnection(envConfig.swapDatabaseURI)
export const walletDatabaseConn: Connection = createConnection(envConfig.walletDatabaseURI)

async function platformDatabaseConnect(): Promise<void> {
  platformDatabaseConn.on("connected", () => console.log("Platform Database Connection Success"))
  platformDatabaseConn.on("error", () => console.log("Platform Database Connection Failure"))
}

async function analyticsDatabaseConnect(): Promise<void> {
  analyticsDatabaseConn.on("connected", () => console.log("Analytics Database Connection Success"))
  analyticsDatabaseConn.on("error", () => console.log("Analytics Database Connection Failure"))
}

async function copilotDatabaseConnect(): Promise<void> {
  copilotDatabaseConn.on("connected", () => console.log("Copilot Database Connection Success"))
  copilotDatabaseConn.on("error", () => console.log("Copilot Database Connection Failure"))
}

async function dataexchangeDatabaseConnect(): Promise<void> {
  dataexchangeDatabaseConn.on("connected", () => console.log("Data Exchange Database Connection Success"))
  dataexchangeDatabaseConn.on("error", () => console.log("Data Exchange Database Connection Failure"))
}

async function walletDatabaseConnect(): Promise<void> {
  walletDatabaseConn.on("connected", () => console.log("Wallet Database Connection Success"))
  walletDatabaseConn.on("error", () => console.log("Wallet Database Connection Failure"))
}

async function nftstudioDatabaseConnect(): Promise<void> {
  nftstudioDatabaseConn.on("connected", () => console.log("NFT Studio Database Connection Success"))
  nftstudioDatabaseConn.on("error", () => console.log("NFT Studio Database Connection Failure"))
}

async function swapDatabaseConnect(): Promise<void> {
  swapDatabaseConn.on("connected", () => console.log("Swap Database Connection Success"))
  swapDatabaseConn.on("error", () => console.log("Swap Database Connection Failure"))
}

async function kvstoreDatabaseConnect(): Promise<void> {
  kvstoreDatabaseConn.on("connected", () => console.log("KV Store Database Connection Success"))
  kvstoreDatabaseConn.on("error", () => console.log("KV Store Database Connection Failure"))
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
}