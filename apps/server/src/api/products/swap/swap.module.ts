import { Module } from "@nestjs/common"
import { SwapService } from "./swap.service"
import { SwapController } from "./swap.controller"

@Module({
  controllers: [SwapController],
  providers: [SwapService],
})
export class SwapModule { }
