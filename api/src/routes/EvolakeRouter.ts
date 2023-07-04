import express, { Router } from 'express'
import EvolakeController from '../controllers/EvolakeController'
import { tokenAuthorizer } from '../middlewares/tokenAuthorizer'
import { apiKeyAuthorizer } from '../middlewares/apiKeyAuthorizer'

export default class EvolakeRouter {
    public router: Router
    public evolakeController: EvolakeController

    constructor() {
        this.router = express.Router()
        this.evolakeController = new EvolakeController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/getdblist', tokenAuthorizer, this.evolakeController.getDatabaseList.bind(this.evolakeController))
        this.router.post('/generatequery', apiKeyAuthorizer, this.evolakeController.generateQuery.bind(this.evolakeController))
        this.router.post('/getqueryhistory', tokenAuthorizer, this.evolakeController.getQueryHistoryByUser.bind(this.evolakeController))
    }

    getRouter() {
        return this.router
    }
}