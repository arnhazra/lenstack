import { Module } from "@nestjs/common"
import { LedgerscanService } from "./ledgerscan.service"
import { LedgerscanController } from "./ledgerscan.controller"
import { HttpModule } from "@nestjs/axios"
import { LedgerscanRepository } from "./ledgerscan.repository"

@Module({
  imports: [HttpModule],
  controllers: [LedgerscanController],
  providers: [LedgerscanService, LedgerscanRepository],
})
export class LedgerscanModule { }
