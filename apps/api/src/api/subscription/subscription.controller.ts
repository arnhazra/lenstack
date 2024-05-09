import { Controller, Post, Body, Get, Query, Res } from "@nestjs/common"
import { SubscriptionService } from "./subscription.service"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"
import { CreateCheckoutSessionDto } from "./dto/create-checkout-session.dto"
import { envConfig } from "src/env.config"
import { otherConstants } from "src/constants/other-constants"

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
  async createCheckoutSession(@TokenAuthorizer() user: TokenAuthorizerResponse, @Body() createCheckoutSessionDto: CreateCheckoutSessionDto) {
    try {
      const session = await this.subscriptionService.createCheckoutSession(createCheckoutSessionDto.selectedPlan, user.userId)
      return { redirectUrl: session.url }
    }

    catch (error) {
      throw error
    }
  }

  @Get("subscribe")
  async handleSubscribe(@Query("session_id") sessionId: string, @Res() res: any) {
    if (!sessionId) {
      res.redirect(envConfig.nodeEnv === "development" ? otherConstants.stripeRedirectUriDev : otherConstants.stripeRedirectUriProd)
    }

    else {
      try {
        await this.subscriptionService.subscribe(sessionId)
        res.redirect(envConfig.nodeEnv === "development" ? otherConstants.stripeRedirectUriDev : otherConstants.stripeRedirectUriProd)
      }

      catch (error) {
        res.redirect(envConfig.nodeEnv === "development" ? otherConstants.stripeRedirectUriDev : otherConstants.stripeRedirectUriProd)
      }
    }
  }

  @Get("cancel")
  handleCancel(@Res() res: any) {
    res.redirect(envConfig.nodeEnv === "development" ? otherConstants.stripeRedirectUriDev : otherConstants.stripeRedirectUriProd)
  }
}
