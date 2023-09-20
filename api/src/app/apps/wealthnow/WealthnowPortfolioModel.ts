import mongoose from "mongoose"
import { wealthnowDb } from "../../../utils/dbConnect"

const WealthnowPortfolioSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },

    name: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

const WealthnowPortfolioModel = wealthnowDb.model("wealthnowportfolio", WealthnowPortfolioSchema)

export default WealthnowPortfolioModel