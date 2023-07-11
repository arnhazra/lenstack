import express, { Router } from 'express'
import CommonController from '../controllers/CommonController'
import { tokenAuthorizer } from '../middlewares/tokenAuthorizer'

export default class CommonRouter {
    public router: Router
    public commonController: CommonController

    constructor() {
        this.router = express.Router()
        this.commonController = new CommonController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/getplatformconfig', this.commonController.getPlatformConfig.bind(this.commonController))
        this.router.post('/getsubscriptionconfig', this.commonController.getSubscriptionConfig.bind(this.commonController))
        this.router.post('/getusagebyapikey', tokenAuthorizer, this.commonController.getUsageByApiKey.bind(this.commonController))
        this.router.post('/getcontractaddresses', tokenAuthorizer, this.commonController.getContractAddresses.bind(this.commonController))
    }

    getRouter() {
        return this.router
    }
}