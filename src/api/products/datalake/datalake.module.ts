import { Module } from "@nestjs/common"
import { DatalakeService } from "./datalake.service"
import { DatalakeController } from "./datalake.controller"
import { DatalakeRepository } from "./datalake.repository"
import { SubscriptionRepository } from "src/api/subscription/subscription.repository"

@Module({
  controllers: [DatalakeController],
  providers: [DatalakeService, DatalakeRepository, SubscriptionRepository],
})
export class DatalakeModule { }
