import mongoose from "mongoose"
import { envConfig } from "../config/env.config"

export const lenstackPlatformMongoDbConn = mongoose.createConnection(envConfig.lenstackPlatformDbUri)
export const datalakeMongoDbConn = mongoose.createConnection(envConfig.datalakeMongoDbUri)
export const payMongoDbConn = mongoose.createConnection(envConfig.payMongoDbUri)
export const insightsMongoDbConn = mongoose.createConnection(envConfig.insightsMongoDbUri)
export const nftstudioMongoDbConn = mongoose.createConnection(envConfig.nftstudioMongoDbUri)
export const swapMongoDbConn = mongoose.createConnection(envConfig.swapMongoDbUri)
export const hyperedgeMongoDbConn = mongoose.createConnection(envConfig.hyperedgeMongoDbUri)
export const ledgerscanMongoDbConn = mongoose.createConnection(envConfig.ledgerscanMongoDbUri)


const lenstackPlatformDbConnect = async () => {
  lenstackPlatformMongoDbConn.on("connected", () => console.log("Lenstack Platform DB Connected"))
  lenstackPlatformMongoDbConn.on("error", (err) => console.log("Lenstack Platform DB Not Connected"))
}

const datalakeDbConnect = async () => {
  datalakeMongoDbConn.on("connected", () => console.log("Datalake DB Connected"))
  datalakeMongoDbConn.on("error", (err) => console.log("Datalake DB Not Connected"))
}

const payDbConnect = async () => {
  payMongoDbConn.on("connected", () => console.log("Lenstack Pay DB Connected"))
  payMongoDbConn.on("error", (err) => console.log("Lenstack Pay DB Not Connected"))
}

const insightsDbConnect = async () => {
  insightsMongoDbConn.on("connected", () => console.log("Insights DB Connected"))
  insightsMongoDbConn.on("error", (err) => console.log("Insights DB Not Connected"))
}

const nftstudioDbConnect = async () => {
  nftstudioMongoDbConn.on("connected", () => console.log("Nftstudio DB Connected"))
  nftstudioMongoDbConn.on("error", (err) => console.log("Nftstudio DB Not Connected"))
}

const swapDbConnect = async () => {
  swapMongoDbConn.on("connected", () => console.log("Lenstack Swap DB Connected"))
  swapMongoDbConn.on("error", (err) => console.log("Lenstack Swap DB Not Connected"))
}

const hyperedgeDbConnect = async () => {
  hyperedgeMongoDbConn.on("connected", () => console.log("Hyperedge DB Connected"))
  hyperedgeMongoDbConn.on("error", (err) => console.log("Hyperedge DB Not Connected"))
}

const ledgerscanMongoDbConnect = async () => {
  ledgerscanMongoDbConn.on("connected", () => console.log("Ledgerscan DB Connected"))
  ledgerscanMongoDbConn.on("error", (err) => console.log("Ledgerscan DB Not Connected"))
}

export const dbConnect = async () => {
  lenstackPlatformDbConnect()
  datalakeDbConnect()
  payDbConnect()
  insightsDbConnect()
  nftstudioDbConnect()
  swapDbConnect()
  hyperedgeDbConnect()
  ledgerscanMongoDbConnect()
}