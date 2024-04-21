import { Controller, Post, Body, Get, Query, Res } from "@nestjs/common"
import { SubscriptionService } from "./subscription.service"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"
import { CreateCheckoutSessionDto } from "./dto/create-checkout-session.dto"
import { envConfig } from "src/env.config"

@Controller("subscription")
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) { }

  @Get("getsubscriptionconfig")
  getSubscriptionConfig() {
    try {
      return this.subscriptionService.getSubscriptionConfig()
    }

    catch (error) {
      throw error
    }
  }

  @Post("create-checkout-session")
  async createCheckoutSession(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Body() createCheckoutSessionDto: CreateCheckoutSessionDto) {
    try {
      const session = await this.subscriptionService.createCheckoutSession(createCheckoutSessionDto.selectedPlan, uft.userId)
      return { redirectUrl: session.url }
    }

    catch (error) {
      throw error
    }
  }

  @Get("subscribe")
  async handleSubscribe(@Query("session_id") sessionId: string, @Res() res: any) {
    if (!sessionId) {
      res.redirect(envConfig.nodeEnv === "development" ? "http://localhost:3000/dashboard" : `https://${envConfig.brandName}.vercel.app/dashboard`)
    }

    else {
      try {
        await this.subscriptionService.subscribe(sessionId)
        res.redirect(envConfig.nodeEnv === "development" ? "http://localhost:3000/dashboard" : `https://${envConfig.brandName}.vercel.app/dashboard`)
      }

      catch (error) {
        res.redirect(envConfig.nodeEnv === "development" ? "http://localhost:3000/dashboard" : `https://${envConfig.brandName}.vercel.app/dashboard`)
      }
    }
  }

  @Get("cancel")
  handleCancel(@Res() res: any) {
    res.redirect(envConfig.nodeEnv === "development" ? "http://localhost:3000/dashboard" : `https://${envConfig.brandName}.vercel.app/dashboard`)
  }
}
