import { Module } from "@nestjs/common"
import { SnowlakeService } from "./snowlake.service"
import { SnowlakeController } from "./snowlake.controller"
import { SnowlakeRepository } from "./snowlake.repository"

@Module({
  controllers: [SnowlakeController],
  providers: [SnowlakeService, SnowlakeRepository],
})
export class SnowlakeModule { }
