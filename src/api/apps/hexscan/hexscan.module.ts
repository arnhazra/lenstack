import { Module } from "@nestjs/common"
import { HexscanService } from "./hexscan.service"
import { HexscanController } from "./hexscan.controller"
import { HttpModule } from "@nestjs/axios"

@Module({
  imports: [HttpModule],
  controllers: [HexscanController],
  providers: [HexscanService],
})
export class HexscanModule { }
