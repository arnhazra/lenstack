import { Module } from "@nestjs/common"
import { AirlakeModule } from "./airlake/airlake.module"
import { FrostlakeModule } from "./frostlake/frostlake.module"
import { SwapstreamModule } from "./swapstream/swapstream.module"
import { PayModule } from "./pay/pay.module"
import { SnowlakeModule } from "./snowlake/snowlake.module"
import { HyperedgeModule } from "./hyperedge/hyperedge.module"
import { HexscanModule } from "./hexscan/hexscan.module"

@Module({
  imports: [AirlakeModule, FrostlakeModule, SwapstreamModule, PayModule, SnowlakeModule, HyperedgeModule, HexscanModule],
})

export class ProductsModule { }
