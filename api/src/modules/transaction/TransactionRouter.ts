import express, { Router } from 'express'
import authorize from '../../middlewares/authorize'
import TransactionController from './TransactionController'

export default class TransactionRouter {
    public router: Router
    public transactionController: TransactionController

    constructor() {
        this.router = express.Router()
        this.transactionController = new TransactionController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/create', authorize, this.transactionController.createTransaction.bind(this.transactionController))
        this.router.post('/getlistbyuser', authorize, this.transactionController.getTransactions.bind(this.transactionController))
    }

    getRouter() {
        return this.router
    }
}