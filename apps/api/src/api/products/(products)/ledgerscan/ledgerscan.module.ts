import { Module } from "@nestjs/common"
import { LedgerscanService } from "./ledgerscan.service"
import { LedgerscanController } from "./ledgerscan.controller"
import { HttpModule } from "@nestjs/axios"

@Module({
  imports: [HttpModule],
  controllers: [LedgerscanController],
  providers: [LedgerscanService],
})
export class LedgerscanModule { }
