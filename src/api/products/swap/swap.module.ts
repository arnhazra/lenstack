import { Module } from "@nestjs/common"
import { SwapService } from "./swap.service"
import { SwapController } from "./swap.controller"
import { SwapRepository } from "./swap.repository"

@Module({
  controllers: [SwapController],
  providers: [SwapService, SwapRepository],
})
export class SwapModule { }
