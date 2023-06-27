import express, { Router } from 'express'
import EvolakeController from '../controllers/EvolakeController'
import evolakeAuthorizer from '../middlewares/evolakeAuthorizer'
import { tokenAuthorizer } from '../middlewares/tokenAuthorizer'

export default class EvolakeRouter {
    public router: Router
    public evolakeController: EvolakeController

    constructor() {
        this.router = express.Router()
        this.evolakeController = new EvolakeController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/generatequery', evolakeAuthorizer, this.evolakeController.generateQuery.bind(this.evolakeController))
        this.router.post('/getqueryhistory', tokenAuthorizer, this.evolakeController.getQueryHistoryByUser.bind(this.evolakeController))
    }

    getRouter() {
        return this.router
    }
}