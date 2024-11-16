import { Module } from "@nestjs/common"
import { WebAnalyticsController } from "./webanalytics.controller"
import { WebAnalyticsService } from "./webanalytics.service"
import { CqrsModule } from "@nestjs/cqrs"
import { WebAnalyticsRepository } from "./webanalytics.repository"
import { envConfig } from "src/config"
import { Events, EventsSchema } from "./schemas/event.schema"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { GetEventsQueryHandler } from "./queries/handler/get-events.handler"
import { CreateEventsCommandHandler } from "./commands/handler/create-event.handler"
import { DatabaseModule } from "src/shared/database/database.module"

@Module({
  imports: [
    CqrsModule,
    DatabaseModule.forRoot(
      envConfig.productsDatabaseURI,
      DbConnectionMap.WebAnalytics
    ),
    DatabaseModule.forFeature(
      [{ name: Events.name, schema: EventsSchema }],
      DbConnectionMap.WebAnalytics
    ),
  ],
  controllers: [WebAnalyticsController],
  providers: [
    WebAnalyticsService,
    WebAnalyticsRepository,
    GetEventsQueryHandler,
    CreateEventsCommandHandler,
  ],
})
export class WebAnalyticsModule {}
