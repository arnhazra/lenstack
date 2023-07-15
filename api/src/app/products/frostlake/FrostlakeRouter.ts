import express, { Router } from 'express'
import FrostlakeController from './FrostlakeController'
import { tokenAuthorizer } from '../../../middlewares/tokenAuthorizer'
import { apiKeyAuthorizer } from '../../../middlewares/apiKeyAuthorizer'

export default class FrostlakeRouter {
    public router: Router
    public frostlakeController: FrostlakeController

    constructor() {
        this.router = express.Router()
        this.frostlakeController = new FrostlakeController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/createanalytics', apiKeyAuthorizer, this.frostlakeController.createAnalytics.bind(this.frostlakeController))
        this.router.post('/getanalytics', tokenAuthorizer, this.frostlakeController.getAnalytics.bind(this.frostlakeController))
    }

    getRouter() {
        return this.router
    }
}