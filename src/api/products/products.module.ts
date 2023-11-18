import { Module } from "@nestjs/common"
import { AirlakeModule } from "./airlake/airlake.module"
import { FrostlakeModule } from "./frostlake/frostlake.module"
import { SwapModule } from "./swap/swap.module"
import { PayModule } from "./pay/pay.module"
import { NftstudioModule } from "./nftstudio/nftstudio.module"
import { HyperedgeModule } from "./hyperedge/hyperedge.module"
import { LedgerscanModule } from "./ledgerscan/ledgerscan.module"

@Module({
  imports: [AirlakeModule, FrostlakeModule, SwapModule, PayModule, NftstudioModule, HyperedgeModule, LedgerscanModule],
})

export class ProductsModule { }
