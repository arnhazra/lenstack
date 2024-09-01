import { Module } from "@nestjs/common"
import { ActivityService } from "./activity.service"
import { ActivityController } from "./activity.controller"
import { CqrsModule } from "@nestjs/cqrs"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { Activity, ActivitySchema } from "./schemas/activity.schema"
import { ActivityRepository } from "./activity.repository"
import { CreateActivityCommandHandler } from "./commands/handler/create-activity.handler"
import { DatabaseModule } from "src/infra/database.module"

@Module({
  imports: [
    CqrsModule,
    DatabaseModule.forFeature([{ name: Activity.name, schema: ActivitySchema }], DbConnectionMap.Core),
  ],
  controllers: [ActivityController],
  providers: [ActivityService, ActivityRepository, CreateActivityCommandHandler],
})

export class ActivityModule { }