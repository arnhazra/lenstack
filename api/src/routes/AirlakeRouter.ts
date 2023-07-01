import express, { Router } from 'express'
import AirlakeController from '../controllers/AirlakeController'
import { airlakeApiAuthorizer } from '../middlewares/airlakeApiAuthorizer'
import { tokenAuthorizer } from '../middlewares/tokenAuthorizer'

export default class AirlakeRouter {
    public router: Router
    public airlakeController: AirlakeController

    constructor() {
        this.router = express.Router()
        this.airlakeController = new AirlakeController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/filters', tokenAuthorizer, this.airlakeController.getDatasetFilters.bind(this.airlakeController))
        this.router.post('/finddatasets', tokenAuthorizer, this.airlakeController.findDatasets.bind(this.airlakeController))
        this.router.post('/viewdataset', tokenAuthorizer, this.airlakeController.viewDataset.bind(this.airlakeController))
        this.router.post('/findsimilardatasets', tokenAuthorizer, this.airlakeController.findSimilarDatasets.bind(this.airlakeController))
        this.router.get('/metadataapi/:datasetId', this.airlakeController.getMetadata.bind(this.airlakeController))
        this.router.get('/dataapi/:datasetId/:subscriptionKey', airlakeApiAuthorizer, this.airlakeController.getData.bind(this.airlakeController))
    }

    getRouter() {
        return this.router
    }
}