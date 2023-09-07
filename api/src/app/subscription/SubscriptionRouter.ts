import express, { Router } from "express"
import SubscriptionController from "./SubscriptionController"
import { tokenAuthorizer } from "../../middlewares/tokenAuthorizer"

export default class UserRouter {
    public router: Router
    public subscriptionController: SubscriptionController

    constructor() {
        this.router = express.Router()
        this.subscriptionController = new SubscriptionController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post("/activatetrial", tokenAuthorizer, this.subscriptionController.activateTrial.bind(this.subscriptionController))
        this.router.post("/subscribe", tokenAuthorizer, this.subscriptionController.subscribe.bind(this.subscriptionController))
        this.router.post("/unsubscribe", tokenAuthorizer, this.subscriptionController.unsubscribe.bind(this.subscriptionController))
    }

    getRouter() {
        return this.router
    }
}