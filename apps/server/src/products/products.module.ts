import { Module } from "@nestjs/common"
import { AnalyticsModule } from "./analytics/analytics.module"
import { BlockchainModule } from "./blockchain/blockchain.module"
import { CopilotModule } from "./copilot/copilot.module"
import { DatamarketplaceModule } from "./datamarketplace/datamarketplace.module"
import { HttpnosqlModule } from "./httpnosql/httpnosql.module"
import { InsightsModule } from "./insights/insights.module"

@Module({
  imports: [AnalyticsModule, BlockchainModule, CopilotModule, DatamarketplaceModule, HttpnosqlModule, InsightsModule]
})
export class ProductsModule { }
