import { Module } from "@nestjs/common"
import { SubscriptionService } from "./subscription.service"
import { SubscriptionController } from "./subscription.controller"
import { SubscriptionRepository } from "./subscription.repository"
import { UserRepository } from "../user/user.repository"

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService, SubscriptionRepository, UserRepository],
})

export class SubscriptionModule { }
