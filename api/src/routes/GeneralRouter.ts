import express, { Router } from 'express'
import GeneralController from '../controllers/GeneralController'

export default class GeneralRouter {
    public router: Router
    public generalController: GeneralController

    constructor() {
        this.router = express.Router()
        this.generalController = new GeneralController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/getproductconfig', this.generalController.getProductDetails.bind(this.generalController))
        this.router.post('/getsubscriptionconfig', this.generalController.getProductSubscriptionConfig.bind(this.generalController))
    }

    getRouter() {
        return this.router
    }
}