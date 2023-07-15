import express, { Router } from 'express'
import IcelakeController from './IcelakeController'
import { tokenAuthorizer } from '../../../middlewares/tokenAuthorizer'
import { apiKeyAuthorizer } from '../../../middlewares/apiKeyAuthorizer'

export default class IcelakeRouter {
    public router: Router
    public icelakeController: IcelakeController

    constructor() {
        this.router = express.Router()
        this.icelakeController = new IcelakeController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/createdoc', apiKeyAuthorizer, this.icelakeController.createDocument.bind(this.icelakeController))
        this.router.post('/getalldoc', tokenAuthorizer, this.icelakeController.getAllDocuments.bind(this.icelakeController))
        this.router.post('/savedoc/:docId', tokenAuthorizer, this.icelakeController.saveDocument.bind(this.icelakeController))
        this.router.delete('/archivedoc/:docId', tokenAuthorizer, this.icelakeController.archiveDocument.bind(this.icelakeController))
    }

    getRouter() {
        return this.router
    }
}