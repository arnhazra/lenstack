import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Res,
  UseGuards,
  Request,
} from "@nestjs/common"
import { SubscriptionService } from "./subscription.service"
import { CreateCheckoutSessionDto } from "./dto/checkout.dto"
import { TokenGuard } from "src/shared/auth/token.guard"
import { ModRequest } from "src/shared/auth/types/mod-request.interface"
import { getRediretUriUI } from "./utils/redirect-uri"

@Controller("subscription")
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get("pricing")
  getSubscriptionPricing() {
    try {
      return this.subscriptionService.getSubscriptionPricing()
    } catch (error) {
      throw error
    }
  }

  @UseGuards(TokenGuard)
  @Post("checkout")
  async createCheckoutSession(
    @Request() request: ModRequest,
    @Body() createCheckoutSessionDto: CreateCheckoutSessionDto
  ) {
    try {
      const session = await this.subscriptionService.createCheckoutSession(
        createCheckoutSessionDto.tier,
        request.user.userId
      )
      return { redirectUrl: session.url }
    } catch (error) {
      throw error
    }
  }

  @Get("subscribe")
  async handleSubscribe(
    @Query("session_id") sessionId: string,
    @Res() res: any
  ) {
    if (!sessionId) {
      res.redirect(getRediretUriUI(false))
    } else {
      try {
        await this.subscriptionService.handleSubscribe(sessionId)
        res.redirect(getRediretUriUI(true))
      } catch (error) {
        res.redirect(getRediretUriUI(false))
      }
    }
  }

  @Get("cancel")
  handleCancel(@Res() res: any) {
    res.redirect(getRediretUriUI(false))
  }
}
