import { Module } from "@nestjs/common"
import { SwapService } from "./swap.service"
import { SwapController } from "./swap.controller"
import { HttpModule } from "@nestjs/axios"

@Module({
  imports: [HttpModule],
  controllers: [SwapController],
  providers: [SwapService],
})
export class SwapModule { }
