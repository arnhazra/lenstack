import { Module } from "@nestjs/common"
import { DatalakeService } from "./datalake.service"
import { DatalakeController } from "./datalake.controller"
import { DatalakeRepository } from "./datalake.repository"

@Module({
  controllers: [DatalakeController],
  providers: [DatalakeService, DatalakeRepository],
})
export class DatalakeModule { }
