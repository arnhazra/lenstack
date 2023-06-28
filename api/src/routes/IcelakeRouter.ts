import express, { Router } from 'express'
import { icelakeApiAuthorizer } from '../middlewares/icelakeApiAuthorizer'
import { tokenAuthorizer } from '../middlewares/tokenAuthorizer'
import IcelakeController from '../controllers/IcelakeController'

export default class IcelakeRouter {
    public router: Router
    public icelakeController: IcelakeController

    constructor() {
        this.router = express.Router()
        this.icelakeController = new IcelakeController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/createdoc', icelakeApiAuthorizer, this.icelakeController.createDocument.bind(this.icelakeController))
        this.router.post('/getalldoc', icelakeApiAuthorizer, this.icelakeController.getAllDocuments.bind(this.icelakeController))
        this.router.post('/savedoc/:docId', icelakeApiAuthorizer, this.icelakeController.saveDocument.bind(this.icelakeController))
        this.router.delete('/deletedoc/:docId', icelakeApiAuthorizer, this.icelakeController.deleteDocument.bind(this.icelakeController))
    }

    getRouter() {
        return this.router
    }
}