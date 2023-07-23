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
        this.router.post('/createproject', tokenAuthorizer, this.frostlakeController.createProject.bind(this.frostlakeController))
        this.router.post('/getprojects', tokenAuthorizer, this.frostlakeController.getProjects.bind(this.frostlakeController))
        this.router.post('/viewproject', tokenAuthorizer, this.frostlakeController.viewProject.bind(this.frostlakeController))
        this.router.delete('/deleteproject/:id', tokenAuthorizer, this.frostlakeController.deleteProject.bind(this.frostlakeController))
        this.router.post('/createanalytics', apiKeyAuthorizer, this.frostlakeController.createAnalytics.bind(this.frostlakeController))
    }

    getRouter() {
        return this.router
    }
}