import express, { Router } from "express"
import AirlakeController from "./AirlakeController"
import { tokenAuthorizer } from "../../../middlewares/tokenAuthorizer"
import { apiKeyAuthorizer } from "../../../middlewares/apiKeyAuthorizer"

export default class AirlakeRouter {
    public router: Router
    public airlakeController: AirlakeController

    constructor() {
        this.router = express.Router()
        this.airlakeController = new AirlakeController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post("/filters", tokenAuthorizer, this.airlakeController.getDatasetFilters.bind(this.airlakeController))
        this.router.post("/finddatasets", tokenAuthorizer, this.airlakeController.findDatasets.bind(this.airlakeController))
        this.router.post("/viewdataset", tokenAuthorizer, this.airlakeController.viewDataset.bind(this.airlakeController))
        this.router.post("/findsimilardatasets", tokenAuthorizer, this.airlakeController.findSimilarDatasets.bind(this.airlakeController))
        this.router.get("/previewdataapi/:datasetId", this.airlakeController.getPreviewData.bind(this.airlakeController))
        this.router.get("/dataapi/:datasetId/:apiKey", apiKeyAuthorizer, this.airlakeController.getData.bind(this.airlakeController))
    }

    getRouter() {
        return this.router
    }
}