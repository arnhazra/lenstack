import { Connection, createConnection } from "mongoose"
import { envConfig } from "../env.config"

export const platformDatabaseConn: Connection = createConnection(envConfig.platformDatabaseURI)
export const analyticsDatabaseConn: Connection = createConnection(envConfig.analyticsDatabaseURI)
export const copilotDatabaseConn: Connection = createConnection(envConfig.copilotDatabaseURI)
export const datamarketplaceDatabaseConn: Connection = createConnection(envConfig.datamarketplaceDatabaseURI)
export const kvstoreDatabaseConn: Connection = createConnection(envConfig.kvstoreDatabaseURI)
export const nftstudioDatabaseConn: Connection = createConnection(envConfig.nftstudioDatabaseURI)

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

async function datamarketplaceDatabaseConnect(): Promise<void> {
  datamarketplaceDatabaseConn.on("connected", () => console.log("Data Marketplace Database Connection Success"))
  datamarketplaceDatabaseConn.on("error", () => console.log("Data Marketplace Database Connection Failure"))
}

async function kvstoreDatabaseConnect(): Promise<void> {
  kvstoreDatabaseConn.on("connected", () => console.log("KV Store Database Connection Success"))
  kvstoreDatabaseConn.on("error", () => console.log("KV Store Database Connection Failure"))
}

async function nftstudioDatabaseConnect(): Promise<void> {
  nftstudioDatabaseConn.on("connected", () => console.log("NFT Studio Database Connection Success"))
  nftstudioDatabaseConn.on("error", () => console.log("NFT Studio Database Connection Failure"))
}

export async function connectDatabases(): Promise<void> {
  platformDatabaseConnect()
  analyticsDatabaseConnect()
  copilotDatabaseConnect()
  datamarketplaceDatabaseConnect()
  kvstoreDatabaseConnect()
  nftstudioDatabaseConnect()
}