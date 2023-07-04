import express, { Router } from 'express'
import SnowlakeController from '../controllers/SnowlakeController'
import { tokenAuthorizer } from '../middlewares/tokenAuthorizer'
import { apiKeyAuthorizer } from '../middlewares/apiKeyAuthorizer'

export default class SnowlakeRouter {
    public router: Router
    public snowlakeController: SnowlakeController

    constructor() {
        this.router = express.Router()
        this.snowlakeController = new SnowlakeController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/createprototype', apiKeyAuthorizer, this.snowlakeController.createPrototype.bind(this.snowlakeController))
        this.router.post('/getallprototypes', tokenAuthorizer, this.snowlakeController.getAllPrototypes.bind(this.snowlakeController))
        this.router.post('/viewprototype/:prototypeId', tokenAuthorizer, this.snowlakeController.viewPrototypeById.bind(this.snowlakeController))
        this.router.delete('/deleteprototype/:prototypeId', tokenAuthorizer, this.snowlakeController.deletePrototype.bind(this.snowlakeController))
    }

    getRouter() {
        return this.router
    }
}