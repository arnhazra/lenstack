import { Module } from "@nestjs/common"
import { HexscanService } from "./hexscan.service"
import { HexscanController } from "./hexscan.controller"
import { HttpModule } from "@nestjs/axios"
import { HexscanRepository } from "./hexscan.repository"

@Module({
  imports: [HttpModule],
  controllers: [HexscanController],
  providers: [HexscanService, HexscanRepository],
})
export class HexscanModule { }
