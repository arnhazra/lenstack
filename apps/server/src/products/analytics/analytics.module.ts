import { Module } from "@nestjs/common"
import { AnalyticsController } from "./analytics.controller"
import { AnalyticsService } from "./analytics.service"
import { CqrsModule } from "@nestjs/cqrs"
import { AnalyticsRepository } from "./analytics.repository"
import { MongooseModule } from "@nestjs/mongoose"
import { envConfig } from "src/env.config"
import { Events, EventsSchema } from "./schemas/event.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { GetEventsQueryHandler } from "./queries/handler/get-events.handler"
import { CreateEventsCommandHandler } from "./commands/handler/create-event.handler"

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forRoot(envConfig.analyticsDatabaseURI, { connectionName: DbConnectionMap.Analytics }),
    MongooseModule.forFeature([{ name: Events.name, schema: EventsSchema }], DbConnectionMap.Analytics),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, AnalyticsRepository, GetEventsQueryHandler, CreateEventsCommandHandler],
})
export class AnalyticsModule { }
