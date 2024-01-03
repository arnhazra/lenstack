import { Module } from "@nestjs/common"
import { SubscriptionService } from "./subscription.service"
import { SubscriptionController } from "./subscription.controller"
import { UserRepository } from "../user/user.repository"
import { HttpModule } from "@nestjs/axios"

@Module({
  imports: [HttpModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, UserRepository],
})

export class SubscriptionModule { }
