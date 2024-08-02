import { Connection, createConnection } from "mongoose"
import { envConfig } from "../env.config"

export const platformDatabaseConn: Connection = createConnection(envConfig.platformDatabaseURI)

async function platformDatabaseConnect(): Promise<void> {
  platformDatabaseConn.on("connected", () => console.log("Platform Database Connection Success"))
  platformDatabaseConn.on("error", () => console.log("Platform Database Connection Failure"))
}

export async function connectDatabases(): Promise<void> {
  platformDatabaseConnect()
}