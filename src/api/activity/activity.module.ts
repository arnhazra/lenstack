import { Module } from "@nestjs/common"
import { ActivityService } from "./activity.service"
import { ActivityController } from "./activity.controller"
import { ActivityRepository } from "./activity.repository"

@Module({
  controllers: [ActivityController],
  providers: [ActivityService, ActivityRepository],
})
export class ActivityModule { }
