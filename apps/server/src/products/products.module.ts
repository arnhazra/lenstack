import { Module } from "@nestjs/common"
import { CopilotModule } from "./copilot/copilot.module"
import { DatamarketplaceModule } from "./datamarketplace/datamarketplace.module"
import { HttpnosqlModule } from "./httpnosql/httpnosql.module"
import { InsightsModule } from "./insights/insights.module"

@Module({
  imports: [CopilotModule, DatamarketplaceModule, HttpnosqlModule, InsightsModule]
})
export class ProductsModule { }
