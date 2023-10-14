import { Module } from "@nestjs/common"
import { DwalletService } from "./dwallet.service"
import { DwalletController } from "./dwallet.controller"
import { DwalletRepository } from "./dwallet.repository"

@Module({
  controllers: [DwalletController],
  providers: [DwalletService, DwalletRepository],
})
export class DwalletModule { }
