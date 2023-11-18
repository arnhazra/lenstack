import mongoose from "mongoose"
import { envConfig } from "../config/env.config"

export const lenstackPlatformMongoDbConn = mongoose.createConnection(envConfig.lenstackPlatformDbUri)
export const airlakeMongoDbConn = mongoose.createConnection(envConfig.airlakeMongoDbUri)
export const payMongoDbConn = mongoose.createConnection(envConfig.payMongoDbUri)
export const frostlakeMongoDbConn = mongoose.createConnection(envConfig.frostlakeMongoDbUri)
export const nftstudioMongoDbConn = mongoose.createConnection(envConfig.nftstudioMongoDbUri)
export const swapMongoDbConn = mongoose.createConnection(envConfig.swapMongoDbUri)
export const hyperedgeMongoDbConn = mongoose.createConnection(envConfig.hyperedgeMongoDbUri)
export const ledgerscanMongoDbConn = mongoose.createConnection(envConfig.ledgerscanMongoDbUri)


const lenstackPlatformDbConnect = async () => {
  lenstackPlatformMongoDbConn.on("connected", () => console.log("Lenstack Platform DB Connected"))
  lenstackPlatformMongoDbConn.on("error", (err) => console.log("Lenstack Platform DB Not Connected"))
}

const airlakeDbConnect = async () => {
  airlakeMongoDbConn.on("connected", () => console.log("Airlake DB Connected"))
  airlakeMongoDbConn.on("error", (err) => console.log("Airlake DB Not Connected"))
}

const payDbConnect = async () => {
  payMongoDbConn.on("connected", () => console.log("Lenstack Pay DB Connected"))
  payMongoDbConn.on("error", (err) => console.log("Lenstack Pay DB Not Connected"))
}

const frostlakeDbConnect = async () => {
  frostlakeMongoDbConn.on("connected", () => console.log("Frostlake DB Connected"))
  frostlakeMongoDbConn.on("error", (err) => console.log("Frostlake DB Not Connected"))
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
  airlakeDbConnect()
  payDbConnect()
  frostlakeDbConnect()
  nftstudioDbConnect()
  swapDbConnect()
  hyperedgeDbConnect()
  ledgerscanMongoDbConnect()
}