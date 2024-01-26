import { Module } from "@nestjs/common"
import { DatalakeModule } from "./datalake/datalake.module"
import { InsightsModule } from "./insights/insights.module"
import { SwapModule } from "./swap/swap.module"
import { WalletModule } from "./wallet/wallet.module"
import { NftstudioModule } from "./nftstudio/nftstudio.module"
import { FabricModule } from "./fabric/fabric.module"
import { LedgerscanModule } from "./ledgerscan/ledgerscan.module"
import { CopilotModule } from "./copilot/copilot.module"

@Module({
  imports: [DatalakeModule, InsightsModule, SwapModule, WalletModule, NftstudioModule, FabricModule, LedgerscanModule, CopilotModule],
})

export class ProductsModule { }
