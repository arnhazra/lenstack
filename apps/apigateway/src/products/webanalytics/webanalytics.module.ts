import { Module } from "@nestjs/common"
import { WebAnalyticsController } from "./webanalytics.controller"
import { WebAnalyticsService } from "./webanalytics.service"
import { CqrsModule } from "@nestjs/cqrs"
import { WebAnalyticsRepository } from "./webanalytics.repository"
import { MongooseModule } from "@nestjs/mongoose"
import { envConfig } from "src/env.config"
import { Events, EventsSchema } from "./schemas/event.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { GetEventsQueryHandler } from "./queries/handler/get-events.handler"
import { CreateEventsCommandHandler } from "./commands/handler/create-event.handler"

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forRoot(envConfig.productsDatabaseURI, { connectionName: DbConnectionMap.WebAnalytics, dbName: DbConnectionMap.WebAnalytics }),
    MongooseModule.forFeature([{ name: Events.name, schema: EventsSchema }], DbConnectionMap.WebAnalytics),
  ],
  controllers: [WebAnalyticsController],
  providers: [WebAnalyticsService, WebAnalyticsRepository, GetEventsQueryHandler, CreateEventsCommandHandler],
})
export class WebAnalyticsModule { }
