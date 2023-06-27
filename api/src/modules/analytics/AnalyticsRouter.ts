import express, { Router } from 'express'
import AnalyticsController from './AnalyticsController'
import authorize from '../../middlewares/authorize'

export default class AnalyticsRouter {
    public router: Router
    public analyticsController: AnalyticsController

    constructor() {
        this.router = express.Router()
        this.analyticsController = new AnalyticsController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/getbyuser', authorize, this.analyticsController.getAnalyticsByUser.bind(this.analyticsController))
    }

    getRouter() {
        return this.router
    }
}