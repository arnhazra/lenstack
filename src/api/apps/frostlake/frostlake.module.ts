import { Module } from "@nestjs/common"
import { FrostlakeService } from "./frostlake.service"
import { FrostlakeController } from "./frostlake.controller"
import { FrostlakeRepository } from "./frostlake.repository"

@Module({
  controllers: [FrostlakeController],
  providers: [FrostlakeService, FrostlakeRepository],
})
export class FrostlakeModule { }
