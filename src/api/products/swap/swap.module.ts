import { Module } from "@nestjs/common"
import { SwapService } from "./swap.service"
import { SwapController } from "./swap.controller"
import { SwapRepository } from "./swap.repository"
import { HttpModule } from "@nestjs/axios"

@Module({
  imports: [HttpModule],
  controllers: [SwapController],
  providers: [SwapService, SwapRepository],
})
export class SwapModule { }
