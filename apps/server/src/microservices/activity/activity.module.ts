import { Module } from "@nestjs/common"
import { ActivityService } from "./activity.service"
import { ActivityController } from "./activity.controller"
import { CqrsModule } from "@nestjs/cqrs"
import { MongooseModule } from "@nestjs/mongoose"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { Activity, ActivitySchema } from "./schemas/activity.schema"
import { ActivityRepository } from "./activity.repository"
import { CreateActivityCommandHandler } from "./commands/handler/create-activity.handler"
import { envConfig } from "src/env.config"

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forRoot(envConfig.coreDatabaseURI, { connectionName: DbConnectionMap.Core }),
    MongooseModule.forFeature([{ name: Activity.name, schema: ActivitySchema }], DbConnectionMap.Core),
  ],
  controllers: [ActivityController],
  providers: [ActivityService, ActivityRepository, CreateActivityCommandHandler],
})

export class ActivityModule { }