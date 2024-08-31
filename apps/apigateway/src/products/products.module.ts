import { Module } from "@nestjs/common"
import { CopilotModule } from "./copilot/copilot.module"
import { DatamarketplaceModule } from "./datamarketplace/datamarketplace.module"
import { HttpnosqlModule } from "./httpnosql/httpnosql.module"
import { WebAnalyticsModule } from "./webanalytics/webanalytics.module"
import { IdentityModule } from "./identity/identity.module"
import { DatabaseModule } from "./database.module"
import { DbConnectionMap } from "src/utils/db-connection.map"

@Module({
  imports: [
    DatabaseModule.forChild(DbConnectionMap.Copilot),
    CopilotModule,
    DatabaseModule.forChild(DbConnectionMap.DataMarketplace),
    DatamarketplaceModule,
    DatabaseModule.forChild(DbConnectionMap.HttpNoSql),
    HttpnosqlModule,
    DatabaseModule.forChild(DbConnectionMap.WebAnalytics),
    WebAnalyticsModule,
    DatabaseModule.forChild(DbConnectionMap.Identity),
    IdentityModule
  ]
})
export class ProductsModule { }
