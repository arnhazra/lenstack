import { Connection, createConnection } from "mongoose"
import { envConfig } from "../env.config"

export const platformDatabaseConn: Connection = createConnection(envConfig.platformDatabaseURI)
export const blockchainDatabaseConn: Connection = createConnection(envConfig.blockchainDatabaseURI)
export const copilotDatabaseConn: Connection = createConnection(envConfig.copilotDatabaseURI)
export const datamarketplaceDatabaseConn: Connection = createConnection(envConfig.datamarketplaceDatabaseURI)
export const kvstoreDatabaseConn: Connection = createConnection(envConfig.kvstoreDatabaseURI)

async function platformDatabaseConnect(): Promise<void> {
  platformDatabaseConn.on("connected", () => console.log("Platform Database Connection Success"))
  platformDatabaseConn.on("error", () => console.log("Platform Database Connection Failure"))
}

async function blockchainDatabaseConnect(): Promise<void> {
  blockchainDatabaseConn.on("connected", () => console.log("Blockchain Database Connection Success"))
  blockchainDatabaseConn.on("error", () => console.log("Blockchain Database Connection Failure"))
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

export async function connectDatabases(): Promise<void> {
  platformDatabaseConnect()
  blockchainDatabaseConnect()
  copilotDatabaseConnect()
  datamarketplaceDatabaseConnect()
  kvstoreDatabaseConnect()
}