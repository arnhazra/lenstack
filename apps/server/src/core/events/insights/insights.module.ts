import { Module } from "@nestjs/common"
import { InsightsService } from "./insights.service"
import { InsightsController } from "./insights.controller"
import { EventEmitterModule } from "@nestjs/event-emitter"
import { CqrsModule } from "@nestjs/cqrs"
import { MongooseModule } from "@nestjs/mongoose"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { Insights, InsightsSchema } from "./schemas/insights.schema"
import { InsightsRepository } from "./insights.repository"
import { CreateInsightsCommandHandler } from "./commands/handler/create-insights.handler"

@Module({
  imports: [
    CqrsModule,
    EventEmitterModule.forRoot(),
    MongooseModule.forFeature([{ name: Insights.name, schema: InsightsSchema }], DbConnectionMap.Core),
  ],
  controllers: [InsightsController],
  providers: [InsightsService, InsightsRepository, CreateInsightsCommandHandler],
})

export class InsightsModule { }