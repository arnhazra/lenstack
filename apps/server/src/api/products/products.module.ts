import { Module } from "@nestjs/common"
import { DataexchangeModule } from "./dataexchange/dataexchange.module"
import { SwapModule } from "./swap/swap.module"
import { WalletModule } from "./wallet/wallet.module"
import { NftstudioModule } from "./nftstudio/nftstudio.module"
import { FabricModule } from "./fabric/fabric.module"
import { LedgerscanModule } from "./ledgerscan/ledgerscan.module"
import { CopilotModule } from "./copilot/copilot.module"
import { AnalyticsModule } from './analytics/analytics.module'

@Module({
  imports: [DataexchangeModule, SwapModule, WalletModule, NftstudioModule, FabricModule, LedgerscanModule, CopilotModule, AnalyticsModule],
})

export class ProductsModule { }
