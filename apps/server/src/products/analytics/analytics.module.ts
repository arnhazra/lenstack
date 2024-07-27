import { Module } from "@nestjs/common"
import { AnalyticsController } from "./analytics.controller"
import { AnalyticsService } from "./analytics.service"
import { CreateAnalyticsCommandHandler } from "./commands/handler/create-analytics.handler"
import { CqrsModule } from "@nestjs/cqrs"
import { AnalyticsRepository } from "./analytics.repository"
import { GetAnalyticsQueryHandler } from "./queries/handler/get-analytics.handler"

@Module({
  imports: [CqrsModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, CreateAnalyticsCommandHandler, AnalyticsRepository, GetAnalyticsQueryHandler],
})
export class AnalyticsModule { }
