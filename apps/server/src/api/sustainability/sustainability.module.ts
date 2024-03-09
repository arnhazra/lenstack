import { Module } from "@nestjs/common"
import { SustainabilityService } from "./sustainability.service"
import { SustainabilityController } from "./sustainability.controller"

@Module({
  controllers: [SustainabilityController],
  providers: [SustainabilityService],
})
export class SustainabilityModule { }
