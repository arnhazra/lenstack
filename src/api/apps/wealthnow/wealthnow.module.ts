import { Module } from "@nestjs/common"
import { WealthnowService } from "./wealthnow.service"
import { WealthnowController } from "./wealthnow.controller"
import { WealthnowRepository } from "./wealthnow.repository"

@Module({
  controllers: [WealthnowController],
  providers: [WealthnowService, WealthnowRepository],
})
export class WealthnowModule { }
