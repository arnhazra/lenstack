import { Module } from "@nestjs/common"
import { CopilotModule } from "./copilot/copilot.module"
import { DatamarketplaceModule } from "./datamarketplace/datamarketplace.module"
import { HttpnosqlModule } from "./httpnosql/httpnosql.module"
import { WebAnalyticsModule } from "./webanalytics/webanalytics.module"
import { IdentityModule } from "./identity/identity.module"

@Module({
  imports: [CopilotModule, DatamarketplaceModule, HttpnosqlModule, WebAnalyticsModule, IdentityModule]
})
export class ProductsModule { }
