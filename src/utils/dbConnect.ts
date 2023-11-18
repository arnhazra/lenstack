import mongoose from "mongoose"
import { envConfig } from "../config/env.config"

export const lenstackPlatformMongoDbConn = mongoose.createConnection(envConfig.lenstackPlatformDbUri)
export const airlakeMongoDbConn = mongoose.createConnection(envConfig.airlakeMongoDbUri)
export const payMongoDbConn = mongoose.createConnection(envConfig.payMongoDbUri)
export const frostlakeMongoDbConn = mongoose.createConnection(envConfig.frostlakeMongoDbUri)
export const snowlakeMongoDbConn = mongoose.createConnection(envConfig.snowlakeMongoDbUri)
export const swapMongoDbConn = mongoose.createConnection(envConfig.swapMongoDbUri)
export const hyperedgeMongoDbConn = mongoose.createConnection(envConfig.hyperedgeMongoDbUri)
export const hexscanMongoDbConn = mongoose.createConnection(envConfig.hexscanMongoDbUri)


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

const snowlakeDbConnect = async () => {
  snowlakeMongoDbConn.on("connected", () => console.log("Snowlake DB Connected"))
  snowlakeMongoDbConn.on("error", (err) => console.log("Snowlake DB Not Connected"))
}

const swapDbConnect = async () => {
  swapMongoDbConn.on("connected", () => console.log("Lenstack Swap DB Connected"))
  swapMongoDbConn.on("error", (err) => console.log("Lenstack Swap DB Not Connected"))
}

const hyperedgeDbConnect = async () => {
  hyperedgeMongoDbConn.on("connected", () => console.log("Hyperedge DB Connected"))
  hyperedgeMongoDbConn.on("error", (err) => console.log("Hyperedge DB Not Connected"))
}

const hexscanMongoDbConnect = async () => {
  hexscanMongoDbConn.on("connected", () => console.log("Hexscan DB Connected"))
  hexscanMongoDbConn.on("error", (err) => console.log("Hexscan DB Not Connected"))
}

export const dbConnect = async () => {
  lenstackPlatformDbConnect()
  airlakeDbConnect()
  payDbConnect()
  frostlakeDbConnect()
  snowlakeDbConnect()
  swapDbConnect()
  hyperedgeDbConnect()
  hexscanMongoDbConnect()
}