import express, { Router } from 'express'
import UserController from './UserController'
import { requestAuthCodeValidators, verifyAuthCodeValidators } from '../../validations/authValidators'
import authorize from '../../middlewares/authorize'

export default class UserRouter {
    public router: Router
    public userController: UserController

    constructor() {
        this.router = express.Router()
        this.userController = new UserController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/requestAuthCode', requestAuthCodeValidators, this.userController.requestAuthCode.bind(this.userController))
        this.router.post('/verifyauthcode', verifyAuthCodeValidators, this.userController.verifyAuthCode.bind(this.userController))
        this.router.post('/user', authorize, this.userController.userDetails.bind(this.userController))
        this.router.post('/signout', authorize, this.userController.signOut.bind(this.userController))
        this.router.post('/subscribe', authorize, this.userController.subscribe.bind(this.userController))
        this.router.post('/unsubscribe', authorize, this.userController.unsubscribe.bind(this.userController))
    }

    getRouter() {
        return this.router
    }
}