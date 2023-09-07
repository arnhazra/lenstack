import express, { Router } from "express"
import { tokenAuthorizer } from "../../middlewares/tokenAuthorizer"
import TransactionController from "./TransactionController"

export default class TransactionRouter {
    public router: Router
    public transactionController: TransactionController

    constructor() {
        this.router = express.Router()
        this.transactionController = new TransactionController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post("/togglepaymentstatuson", tokenAuthorizer, this.transactionController.togglePaymentStatusOn.bind(this.transactionController))
        this.router.post("/togglepaymentstatusoff", tokenAuthorizer, this.transactionController.togglePaymentStatusOff.bind(this.transactionController))
        this.router.post("/getpaymentstatus", tokenAuthorizer, this.transactionController.getCurrentPaymentStatus.bind(this.transactionController))
        this.router.post("/create", tokenAuthorizer, this.transactionController.createTransaction.bind(this.transactionController))
        this.router.post("/gettxbyuser", tokenAuthorizer, this.transactionController.getTransactions.bind(this.transactionController))
    }

    getRouter() {
        return this.router
    }
}