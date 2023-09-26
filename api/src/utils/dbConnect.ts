import mongoose from "mongoose"
import { envConfig } from "../../config/envConfig"

const frostlakeDb = mongoose.createConnection(envConfig.frostlakeMongoUri)
const evolakeDb = mongoose.createConnection(envConfig.evolakeMongoUri)
const wealthnowDb = mongoose.createConnection(envConfig.wealthnowMongoUri)
const masterDb = mongoose.createConnection(envConfig.lenstackMasterDbUri)
const replicaDb = mongoose.createConnection(envConfig.lenstackReplicaDbUri)

const dbConnect = async () => {
    frostlakeDb.on("connected", () => {
        console.log("Frostlake DB Connected")
    })

    frostlakeDb.on("error", (err) => {
        console.log("Frostlake DB Not Connected")
    })

    evolakeDb.on("connected", () => {
        console.log("Evolake DB Connected")
    })

    evolakeDb.on("error", (err) => {
        console.log("Evolake DB Not Connected")
    })

    wealthnowDb.on("connected", () => {
        console.log("Wealthnow DB Connected")
    })

    wealthnowDb.on("error", (err) => {
        console.log("Wealthnow DB Not Connected")
    })

    masterDb.on("connected", () => {
        console.log("Master DB Connected")
    })

    masterDb.on("error", (err) => {
        console.log("Master DB Not Connected")
    })

    replicaDb.on("connected", () => {
        console.log("Replica DB Connected")
    })

    replicaDb.on("error", (err) => {
        console.log("Replica DB Not Connected")
    })
}

export { dbConnect, frostlakeDb, evolakeDb, wealthnowDb, masterDb, replicaDb }