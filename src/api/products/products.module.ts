import { Module } from "@nestjs/common"
import { AirlakeModule } from "./airlake/airlake.module"
import { FrostlakeModule } from "./frostlake/frostlake.module"
import { SwapModule } from "./swap/swap.module"
import { PayModule } from "./pay/pay.module"
import { SnowlakeModule } from "./snowlake/snowlake.module"
import { HyperedgeModule } from "./hyperedge/hyperedge.module"
import { HexscanModule } from "./hexscan/hexscan.module"

@Module({
  imports: [AirlakeModule, FrostlakeModule, SwapModule, PayModule, SnowlakeModule, HyperedgeModule, HexscanModule],
})

export class ProductsModule { }
