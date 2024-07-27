import { Module } from "@nestjs/common"
import { ApiModule } from "./api/api.module"
import { EventsModule } from "./events/events.module"

@Module({
  imports: [ApiModule, EventsModule]
})
export class CoreModule { }
