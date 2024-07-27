import { Module } from "@nestjs/common"
import { InsightsService } from "./insights.service"
import { InsightsController } from "./insights.controller"
import { EventEmitterModule } from "@nestjs/event-emitter"

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [InsightsController],
  providers: [InsightsService],
})
export class InsightsModule { }
