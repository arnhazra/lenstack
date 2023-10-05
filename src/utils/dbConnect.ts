import mongoose from "mongoose"
import { envConfig } from "../config/envConfig"

const mongoDbConn = mongoose.createConnection(envConfig.lenstackMongoDbUri)

const dbConnect = async () => {
  mongoDbConn.on("connected", () => console.log("Mongo DB Connected"))
  mongoDbConn.on("error", (err) => console.log("Mongo DB Not Connected"))
}

export { dbConnect, mongoDbConn }