import { Module } from "@nestjs/common"
import { PayService } from "./pay.service"
import { PayController } from "./pay.controller"
import { PayRepository } from "./pay.repository"
import { HttpModule } from "@nestjs/axios"

@Module({
  imports: [HttpModule],
  controllers: [PayController],
  providers: [PayService, PayRepository],
})
export class PayModule { }
