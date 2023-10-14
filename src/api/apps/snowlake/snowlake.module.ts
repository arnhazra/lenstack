import { Module } from "@nestjs/common"
import { SnowlakeService } from "./snowlake.service"
import { SnowlakeController } from "./snowlake.controller"

@Module({
  controllers: [SnowlakeController],
  providers: [SnowlakeService],
})
export class SnowlakeModule { }
