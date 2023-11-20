import mongoose from "mongoose"
import { envConfig } from "../config/env.config"

export const platformMongoDbConn = mongoose.createConnection(envConfig.platformDbUri)
export const datalakeMongoDbConn = mongoose.createConnection(envConfig.datalakeMongoDbUri)
export const payMongoDbConn = mongoose.createConnection(envConfig.payMongoDbUri)
export const insightsMongoDbConn = mongoose.createConnection(envConfig.insightsMongoDbUri)
export const nftstudioMongoDbConn = mongoose.createConnection(envConfig.nftstudioMongoDbUri)
export const swapMongoDbConn = mongoose.createConnection(envConfig.swapMongoDbUri)
export const fabricMongoDbConn = mongoose.createConnection(envConfig.fabricMongoDbUri)
export const ledgerscanMongoDbConn = mongoose.createConnection(envConfig.ledgerscanMongoDbUri)


const platformDbConnect = async () => {
  platformMongoDbConn.on("connected", () => console.log("Platform DB Connected"))
  platformMongoDbConn.on("error", () => console.log("Platform DB Not Connected"))
}

const datalakeDbConnect = async () => {
  datalakeMongoDbConn.on("connected", () => console.log("Datalake DB Connected"))
  datalakeMongoDbConn.on("error", () => console.log("Datalake DB Not Connected"))
}

const payDbConnect = async () => {
  payMongoDbConn.on("connected", () => console.log("Pay DB Connected"))
  payMongoDbConn.on("error", () => console.log("Pay DB Not Connected"))
}

const insightsDbConnect = async () => {
  insightsMongoDbConn.on("connected", () => console.log("Insights DB Connected"))
  insightsMongoDbConn.on("error", () => console.log("Insights DB Not Connected"))
}

const nftstudioDbConnect = async () => {
  nftstudioMongoDbConn.on("connected", () => console.log("NFT Studio DB Connected"))
  nftstudioMongoDbConn.on("error", () => console.log("NFT Studio DB Not Connected"))
}

const swapDbConnect = async () => {
  swapMongoDbConn.on("connected", () => console.log("Swap DB Connected"))
  swapMongoDbConn.on("error", () => console.log("Swap DB Not Connected"))
}

const fabricDbConnect = async () => {
  fabricMongoDbConn.on("connected", () => console.log("Fabric DB Connected"))
  fabricMongoDbConn.on("error", () => console.log("Fabric DB Not Connected"))
}

const ledgerscanMongoDbConnect = async () => {
  ledgerscanMongoDbConn.on("connected", () => console.log("Ledgerscan DB Connected"))
  ledgerscanMongoDbConn.on("error", () => console.log("Ledgerscan DB Not Connected"))
}

export const dbConnect = async () => {
  platformDbConnect()
  datalakeDbConnect()
  payDbConnect()
  insightsDbConnect()
  nftstudioDbConnect()
  swapDbConnect()
  fabricDbConnect()
  ledgerscanMongoDbConnect()
}