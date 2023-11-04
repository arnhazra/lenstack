import mongoose from "mongoose"
import { envConfig } from "../config/envConfig"

export const lenstackPlatformMongoDbConn = mongoose.createConnection(envConfig.lenstackPlatformDbUri)
export const airlakeMongoDbConn = mongoose.createConnection(envConfig.airlakeMongoDbUri)
export const edgepayMongoDbConn = mongoose.createConnection(envConfig.edgepayMongoDbUri)
export const frostlakeMongoDbConn = mongoose.createConnection(envConfig.frostlakeMongoDbUri)
export const snowlakeMongoDbConn = mongoose.createConnection(envConfig.snowlakeMongoDbUri)
export const swapstreamMongoDbConn = mongoose.createConnection(envConfig.swapstreamMongoDbUri)
export const hyperedgeMongoDbConn = mongoose.createConnection(envConfig.hyperedgeMongoDbUri)
export const hexscanMongoDbConn = mongoose.createConnection(envConfig.hexscanMongoDbUri)


const lenstackPlatformDbConnect = async () => {
  lenstackPlatformMongoDbConn.on("connected", () => console.log("Main Lenstack DB Connected"))
  lenstackPlatformMongoDbConn.on("error", (err) => console.log("Main Lenstack DB Not Connected"))
}

const airlakeDbConnect = async () => {
  airlakeMongoDbConn.on("connected", () => console.log("Airlake DB Connected"))
  airlakeMongoDbConn.on("error", (err) => console.log("Airlake DB Not Connected"))
}

const edgepayDbConnect = async () => {
  edgepayMongoDbConn.on("connected", () => console.log("Edgepay DB Connected"))
  edgepayMongoDbConn.on("error", (err) => console.log("Edgepay DB Not Connected"))
}

const frostlakeDbConnect = async () => {
  frostlakeMongoDbConn.on("connected", () => console.log("Frostlake DB Connected"))
  frostlakeMongoDbConn.on("error", (err) => console.log("Frostlake DB Not Connected"))
}

const snowlakeDbConnect = async () => {
  snowlakeMongoDbConn.on("connected", () => console.log("Snowlake DB Connected"))
  snowlakeMongoDbConn.on("error", (err) => console.log("Snowlake DB Not Connected"))
}

const swapstreamDbConnect = async () => {
  swapstreamMongoDbConn.on("connected", () => console.log("Swpastream DB Connected"))
  swapstreamMongoDbConn.on("error", (err) => console.log("Swpastream DB Not Connected"))
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
  edgepayDbConnect()
  frostlakeDbConnect()
  snowlakeDbConnect()
  swapstreamDbConnect()
  hyperedgeDbConnect()
  hexscanMongoDbConnect()
}