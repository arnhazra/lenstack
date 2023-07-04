import express, { Router } from 'express'
import GeneralController from '../controllers/GeneralController'
import { tokenAuthorizer } from '../middlewares/tokenAuthorizer'

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
        this.router.post('/getusagebyapikey', tokenAuthorizer, this.generalController.getUsageByApiKey.bind(this.generalController))
    }

    getRouter() {
        return this.router
    }
}