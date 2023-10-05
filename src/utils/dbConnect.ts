import mongoose from "mongoose"
import { envConfig } from "../config/envConfig"

const masterDb = mongoose.createConnection(envConfig.lenstackMongoDbUri)

const dbConnect = async () => {
  masterDb.on("connected", () => console.log("Mongo DB Connected"))
  masterDb.on("error", (err) => console.log("Mongo DB Not Connected"))
}

export { dbConnect, masterDb }