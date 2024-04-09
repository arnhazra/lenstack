import { Module } from "@nestjs/common"
import { DataexchangeModule } from "./(products)/dataexchange/dataexchange.module"
import { SwapModule } from "./(products)/swap/swap.module"
import { WalletModule } from "./(products)/wallet/wallet.module"
import { NftstudioModule } from "./(products)/nftstudio/nftstudio.module"
import { KvstoreModule } from "./(products)/kvstore/kvstore.module"
import { LedgerscanModule } from "./(products)/ledgerscan/ledgerscan.module"
import { CopilotModule } from "./(products)/copilot/copilot.module"
import { AnalyticsModule } from "./(products)/analytics/analytics.module"
import { ProductsController } from "./products.controller"
import { ProductsService } from "./products.service"

@Module({
  controllers: [ProductsController],
  imports: [DataexchangeModule, SwapModule, WalletModule, NftstudioModule, KvstoreModule, LedgerscanModule, CopilotModule, AnalyticsModule],
  providers: [ProductsService]
})

export class ProductsModule { }
