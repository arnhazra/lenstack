import express, { Router } from "express"
import WealthnowController from "./WealthnowController"
import { tokenAuthorizer } from "../../../middlewares/tokenAuthorizer"

export default class WealthnowRouter {
    public router: Router
    public wealthnowController: WealthnowController

    constructor() {
        this.router = express.Router()
        this.wealthnowController = new WealthnowController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post("/createportfolio", tokenAuthorizer, this.wealthnowController.createPortfolio.bind(this.wealthnowController))
        this.router.post("/getportfolios", tokenAuthorizer, this.wealthnowController.getPortfolios.bind(this.wealthnowController))
        this.router.post("/viewportfolio", tokenAuthorizer, this.wealthnowController.viewPortfolio.bind(this.wealthnowController))
        this.router.delete("/deleteportfolio/:id", tokenAuthorizer, this.wealthnowController.deletePortfolio.bind(this.wealthnowController))
        this.router.post("/createasset", tokenAuthorizer, this.wealthnowController.createAsset.bind(this.wealthnowController))
        this.router.post("/viewasset", tokenAuthorizer, this.wealthnowController.viewAsset.bind(this.wealthnowController))
        this.router.patch("/editasset", tokenAuthorizer, this.wealthnowController.editAsset.bind(this.wealthnowController))
        this.router.delete("/deleteasset/:id", tokenAuthorizer, this.wealthnowController.deleteAsset.bind(this.wealthnowController))
    }

    getRouter() {
        return this.router
    }
}