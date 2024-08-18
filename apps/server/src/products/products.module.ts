import { Module } from "@nestjs/common"
import { CopilotModule } from "./copilot/copilot.module"
import { DatamarketplaceModule } from "./datamarketplace/datamarketplace.module"
import { HttpnosqlModule } from "./httpnosql/httpnosql.module"
import { WebAnalyticsModule } from "./webanalytics/webanalytics.module"

@Module({
  imports: [CopilotModule, DatamarketplaceModule, HttpnosqlModule, WebAnalyticsModule]
})
export class ProductsModule { }
