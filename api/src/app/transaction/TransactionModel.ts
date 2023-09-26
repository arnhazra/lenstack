import mongoose from "mongoose"
import { mainLenstackDb, masterDb, replicaDb } from "../../utils/dbConnect"

const TransactionSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },

    transactionType: {
        type: String,
        required: true
    },

    fromAddress: {
        type: String,
        required: true
    },

    ethAmount: {
        type: String,
        required: true
    },

    txHash: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

const MasterTransactionModel = masterDb.model("transaction", TransactionSchema)
const ReplicaTransactionModel = replicaDb.model("transaction", TransactionSchema)

export { MasterTransactionModel, ReplicaTransactionModel }