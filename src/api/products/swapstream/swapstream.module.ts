import { Module } from "@nestjs/common"
import { SwapstreamService } from "./swapstream.service"
import { SwapstreamController } from "./swapstream.controller"
import { SwapstreamRepository } from "./swapstream.repository"

@Module({
  controllers: [SwapstreamController],
  providers: [SwapstreamService, SwapstreamRepository],
})
export class SwapstreamModule { }
