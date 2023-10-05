import { Module } from "@nestjs/common"
import { SubscriptionService } from "./subscription.service"
import { SubscriptionController } from "./subscription.controller"
import { SubscriptionRepository } from "./subscription.repository"
import { UserRepository } from "../user/user.repository"
import { AirlakeRepository } from "../apps/airlake/airlake.repository"
import { FrostlakeRepository } from "../apps/frostlake/frostlake.repository"
import { WealthnowRepository } from "../apps/wealthnow/wealthnow.repository"

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService, SubscriptionRepository, UserRepository, AirlakeRepository, FrostlakeRepository, WealthnowRepository],
})
export class SubscriptionModule { }
