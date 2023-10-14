import { Module } from "@nestjs/common"
import { SubscriptionService } from "./subscription.service"
import { SubscriptionController } from "./subscription.controller"
import { SubscriptionRepository } from "./subscription.repository"
import { UserRepository } from "../user/user.repository"
import { AirlakeRepository } from "../apps/airlake/airlake.repository"
import { FrostlakeRepository } from "../apps/frostlake/frostlake.repository"
import { WealthnowRepository } from "../apps/wealthnow/wealthnow.repository"
import { DwalletRepository } from "../apps/dwallet/dwallet.repository"
import { SwapstreamRepository } from "../apps/swapstream/swapstream.repository"
import { SnowlakeRepository } from "../apps/snowlake/snowlake.repository"

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService, SubscriptionRepository, UserRepository, AirlakeRepository, DwalletRepository, FrostlakeRepository, WealthnowRepository, SwapstreamRepository, SnowlakeRepository],
})

export class SubscriptionModule { }
