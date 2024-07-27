import { Module } from "@nestjs/common"
import { AnalyticsModule } from "./analytics/analytics.module"
import { BlockchainModule } from "./blockchain/blockchain.module"
import { CopilotModule } from "./copilot/copilot.module"
import { DatamarketplaceModule } from "./datamarketplace/datamarketplace.module"
import { KvstoreModule } from "./kvstore/kvstore.module"

@Module({
  imports: [AnalyticsModule, BlockchainModule, CopilotModule, DatamarketplaceModule, KvstoreModule]
})
export class ProductsModule { }
