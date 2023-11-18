import { Module } from "@nestjs/common"
import { InsightsService } from "./insights.service"
import { InsightsController } from "./insights.controller"
import { InsightsRepository } from "./insights.repository"

@Module({
  controllers: [InsightsController],
  providers: [InsightsService, InsightsRepository],
})
export class InsightsModule { }
