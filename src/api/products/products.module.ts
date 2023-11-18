import { Module } from "@nestjs/common"
import { DatalakeModule } from "./datalake/datalake.module"
import { InsightsModule } from "./insights/insights.module"
import { SwapModule } from "./swap/swap.module"
import { PayModule } from "./pay/pay.module"
import { NftstudioModule } from "./nftstudio/nftstudio.module"
import { HyperedgeModule } from "./hyperedge/hyperedge.module"
import { LedgerscanModule } from "./ledgerscan/ledgerscan.module"

@Module({
  imports: [DatalakeModule, InsightsModule, SwapModule, PayModule, NftstudioModule, HyperedgeModule, LedgerscanModule],
})

export class ProductsModule { }
