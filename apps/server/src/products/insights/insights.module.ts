import { Module } from "@nestjs/common"
import { InsightsController } from "./insights.controller"
import { InsightsService } from "./insights.service"
import { CqrsModule } from "@nestjs/cqrs"
import { InsightsRepository } from "./insights.repository"
import { MongooseModule } from "@nestjs/mongoose"
import { envConfig } from "src/env.config"
import { Events, EventsSchema } from "./schemas/event.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { GetEventsQueryHandler } from "./queries/handler/get-events.handler"
import { CreateEventsCommandHandler } from "./commands/handler/create-event.handler"

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forRoot(envConfig.insightsDatabaseURI, { connectionName: DbConnectionMap.Insights }),
    MongooseModule.forFeature([{ name: Events.name, schema: EventsSchema }], DbConnectionMap.Insights),
  ],
  controllers: [InsightsController],
  providers: [InsightsService, InsightsRepository, GetEventsQueryHandler, CreateEventsCommandHandler],
})
export class InsightsModule { }
