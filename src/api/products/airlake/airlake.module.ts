import { Module } from "@nestjs/common"
import { AirlakeService } from "./airlake.service"
import { AirlakeController } from "./airlake.controller"
import { AirlakeRepository } from "./airlake.repository"
import { SubscriptionRepository } from "src/api/subscription/subscription.repository"

@Module({
  controllers: [AirlakeController],
  providers: [AirlakeService, AirlakeRepository, SubscriptionRepository],
})
export class AirlakeModule { }
