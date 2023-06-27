import express, { Router } from 'express'
import EvolakeController from '../controllers/EvolakeController'
import queryAuthorizer from '../middlewares/evolakeAuthorizer'
import authorize from '../middlewares/authorize'

export default class EvolakeRouter {
    public router: Router
    public evolakeController: EvolakeController

    constructor() {
        this.router = express.Router()
        this.evolakeController = new EvolakeController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/generatequery', queryAuthorizer, this.evolakeController.generateQuery.bind(this.evolakeController))
        this.router.post('/getqueryhistory', authorize, this.evolakeController.getQueryHistoryByUser.bind(this.evolakeController))
    }

    getRouter() {
        return this.router
    }
}