import mongoose from "mongoose"
import { envConfig } from "../config/envConfig"

export const mainLenstackMongoDbConn = mongoose.createConnection(envConfig.lenstackMongoDbUri)
export const airlakeMongoDbConn = mongoose.createConnection(envConfig.airlakeMongoDbUri)
export const cruxqlMongoDbConn = mongoose.createConnection(envConfig.cruxqlMongoDbUri)
export const dwalletMongoDbConn = mongoose.createConnection(envConfig.dwalletMongoDbUri)
export const frostlakeMongoDbConn = mongoose.createConnection(envConfig.frostlakeMongoDbUri)
export const snowlakeMongoDbConn = mongoose.createConnection(envConfig.snowlakeMongoDbUri)
export const swapstreamMongoDbConn = mongoose.createConnection(envConfig.swapstreamMongoDbUri)
export const wealthnowMongoDbConn = mongoose.createConnection(envConfig.wealthnowMongoDbUri)

export const mainLenstackDbConnect = async () => {
  mainLenstackMongoDbConn.on("connected", () => console.log("Main Lenstack DB Connected"))
  mainLenstackMongoDbConn.on("error", (err) => console.log("Main Lenstack DB Not Connected"))
}

export const airlakeDbConnect = async () => {
  airlakeMongoDbConn.on("connected", () => console.log("Airlake DB Connected"))
  airlakeMongoDbConn.on("error", (err) => console.log("Airlake DB Not Connected"))
}

export const cruxqlDbConnect = async () => {
  cruxqlMongoDbConn.on("connected", () => console.log("Cruxql DB Connected"))
  cruxqlMongoDbConn.on("error", (err) => console.log("Cruxql Not Connected"))
}

export const dwalletDbConnect = async () => {
  dwalletMongoDbConn.on("connected", () => console.log("Dwallet DB Connected"))
  dwalletMongoDbConn.on("error", (err) => console.log("Dwallet DB Not Connected"))
}

export const frostlakeDbConnect = async () => {
  frostlakeMongoDbConn.on("connected", () => console.log("Frostlake DB Connected"))
  frostlakeMongoDbConn.on("error", (err) => console.log("Frostlake DB Not Connected"))
}

export const snowlakeDbConnect = async () => {
  snowlakeMongoDbConn.on("connected", () => console.log("Snowlake DB Connected"))
  snowlakeMongoDbConn.on("error", (err) => console.log("Snowlake DB Not Connected"))
}

export const swapstreamDbConnect = async () => {
  swapstreamMongoDbConn.on("connected", () => console.log("Swpastream DB Connected"))
  swapstreamMongoDbConn.on("error", (err) => console.log("Swpastream DB Not Connected"))
}

export const wealthnowDbConnect = async () => {
  wealthnowMongoDbConn.on("connected", () => console.log("Wealthnow DB Connected"))
  wealthnowMongoDbConn.on("error", (err) => console.log("Wealthnow DB Not Connected"))
}

export const dbConnect = async () => {
  mainLenstackDbConnect()
  airlakeDbConnect()
  cruxqlDbConnect()
  dwalletDbConnect()
  frostlakeDbConnect()
  snowlakeDbConnect()
  swapstreamDbConnect()
  wealthnowDbConnect()
}