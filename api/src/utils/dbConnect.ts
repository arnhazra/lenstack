import mongoose from "mongoose"
import { envConfig } from "../../config/envConfig"

const mainLenstackDb = mongoose.createConnection(envConfig.mainLenstackMongoUri)
const airlakeDb = mongoose.createConnection(envConfig.airlakeMongoUri)
const icelakeDb = mongoose.createConnection(envConfig.icelakeMongoUri)
const frostlakeDb = mongoose.createConnection(envConfig.frostlakeMongoUri)
const evolakeDb = mongoose.createConnection(envConfig.evolakeMongoUri)
const wealthnowDb = mongoose.createConnection(envConfig.wealthnowMongoUri)

const dbConnect = async () => {
    mainLenstackDb.on("connected", () => {
        console.log("Main Lenstack DB Connected")
    })

    mainLenstackDb.on("error", (err) => {
        console.log("Main Lenstack DB not connected")
    })

    airlakeDb.on("connected", () => {
        console.log("Airlake DB Connected")
    })

    airlakeDb.on("error", (err) => {
        console.log("Airlake DB Not Connected")
    })

    icelakeDb.on("connected", () => {
        console.log("Icelake DB Connected")
    })

    icelakeDb.on("error", (err) => {
        console.log("Icelake DB Not Connected")
    })

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
}

export { dbConnect, mainLenstackDb, airlakeDb, icelakeDb, frostlakeDb, evolakeDb, wealthnowDb }