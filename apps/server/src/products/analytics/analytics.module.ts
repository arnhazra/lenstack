import { Module } from "@nestjs/common"
import { AnalyticsController } from "./analytics.controller"
import { AnalyticsService } from "./analytics.service"
import { CqrsModule } from "@nestjs/cqrs"
import { AnalyticsRepository } from "./analytics.repository"
import { MongooseModule } from "@nestjs/mongoose"
import { envConfig } from "src/env.config"
import { Analytics, AnalyticsSchema } from "./schemas/analytics.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forRoot(envConfig.analyticsDatabaseURI, { connectionName: DbConnectionMap.Analytics }),
    MongooseModule.forFeature([{ name: Analytics.name, schema: AnalyticsSchema }], DbConnectionMap.Analytics),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, AnalyticsRepository],
})
export class AnalyticsModule { }
