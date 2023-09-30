import mongoose from "mongoose"
import { envConfig } from "../config/envConfig"

const masterDb = mongoose.createConnection(envConfig.lenstackMasterDbUri)
const replicaDb = mongoose.createConnection(envConfig.lenstackReplicaDbUri)

const dbConnect = async () => {
  masterDb.on("connected", () => console.log("Master DB Connected"))
  masterDb.on("error", (err) => console.log("Master DB Not Connected"))
  replicaDb.on("connected", () => console.log("Replica DB Connected"))
  replicaDb.on("error", (err) => console.log("Replica DB Not Connected"))
}

export { dbConnect, masterDb, replicaDb }