import { Module } from "@nestjs/common"
import { AirlakeModule } from "./airlake/airlake.module"
import { FrostlakeModule } from "./frostlake/frostlake.module"
import { SwapstreamModule } from "./swapstream/swapstream.module"
import { EdgepayModule } from "./edgepay/edgepay.module"
import { SnowlakeModule } from "./snowlake/snowlake.module"
import { HyperedgeModule } from "./hyperedge/hyperedge.module"

@Module({
  imports: [AirlakeModule, FrostlakeModule, SwapstreamModule, EdgepayModule, SnowlakeModule, HyperedgeModule]
})
export class AppsModule { }
