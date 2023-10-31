import mongoose from "mongoose"
import { envConfig } from "../config/envConfig"

export const lenstackPlatformMongoDbConn = mongoose.createConnection(envConfig.lenstackPlatformDbUri)
export const airlakeMongoDbConn = mongoose.createConnection(envConfig.airlakeMongoDbUri)
export const dwalletMongoDbConn = mongoose.createConnection(envConfig.dwalletMongoDbUri)
export const frostlakeMongoDbConn = mongoose.createConnection(envConfig.frostlakeMongoDbUri)
export const snowlakeMongoDbConn = mongoose.createConnection(envConfig.snowlakeMongoDbUri)
export const swapstreamMongoDbConn = mongoose.createConnection(envConfig.swapstreamMongoDbUri)
export const vuelockMongoDbConn = mongoose.createConnection(envConfig.vuelockMongoDbUri)

const lenstackPlatformDbConnect = async () => {
  lenstackPlatformMongoDbConn.on("connected", () => console.log("Main Lenstack DB Connected"))
  lenstackPlatformMongoDbConn.on("error", (err) => console.log("Main Lenstack DB Not Connected"))
}

const airlakeDbConnect = async () => {
  airlakeMongoDbConn.on("connected", () => console.log("Airlake DB Connected"))
  airlakeMongoDbConn.on("error", (err) => console.log("Airlake DB Not Connected"))
}

const dwalletDbConnect = async () => {
  dwalletMongoDbConn.on("connected", () => console.log("Dwallet DB Connected"))
  dwalletMongoDbConn.on("error", (err) => console.log("Dwallet DB Not Connected"))
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

const vuelockDbConnect = async () => {
  vuelockMongoDbConn.on("connected", () => console.log("Vuelock DB Connected"))
  vuelockMongoDbConn.on("error", (err) => console.log("Vuelock DB Not Connected"))
}

export const dbConnect = async () => {
  lenstackPlatformDbConnect()
  airlakeDbConnect()
  dwalletDbConnect()
  frostlakeDbConnect()
  snowlakeDbConnect()
  swapstreamDbConnect()
  vuelockDbConnect()
}