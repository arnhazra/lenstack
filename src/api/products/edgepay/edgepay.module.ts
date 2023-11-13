import { Module } from "@nestjs/common"
import { EdgepayService } from "./edgepay.service"
import { EdgepayController } from "./edgepay.controller"
import { EdgepayRepository } from "./edgepay.repository"

@Module({
  controllers: [EdgepayController],
  providers: [EdgepayService, EdgepayRepository],
})
export class EdgepayModule { }
