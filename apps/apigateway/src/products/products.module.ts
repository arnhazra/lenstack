import { Module, DynamicModule } from "@nestjs/common"
import { CopilotModule } from "./copilot/copilot.module"
import { DatamarketplaceModule } from "./datamarketplace/datamarketplace.module"
import { HttpnosqlModule } from "./httpnosql/httpnosql.module"
import { WebAnalyticsModule } from "./webanalytics/webanalytics.module"
import { IdentityModule } from "./identity/identity.module"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { MongooseModule } from "@nestjs/mongoose";
import { envConfig } from "src/env.config";

@Module({})
export class DatabaseModule {
  static forChild(mappedDb: DbConnectionMap): DynamicModule {
    return MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: envConfig.productsDatabaseURI,
        dbName: mappedDb,
      }),
      connectionName: mappedDb,
    });
  }
}

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
