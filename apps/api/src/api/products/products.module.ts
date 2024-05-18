import { Module } from "@nestjs/common"
import { AnalyticsModule } from "./(products)/analytics/analytics.module"
import { CopilotModule } from "./(products)/copilot/copilot.module"
import { DatamarketplaceModule } from "./(products)/datamarketplace/datamarketplace.module"
import { KvstoreModule } from "./(products)/kvstore/kvstore.module"
import { NftstudioModule } from "./(products)/nftstudio/nftstudio.module"
import { ProductsController } from "./products.controller"
import { ProductsService } from "./products.service"

@Module({
  controllers: [ProductsController],
  imports: [AnalyticsModule, CopilotModule, DatamarketplaceModule, KvstoreModule, NftstudioModule],
  providers: [ProductsService]
})

export class ProductsModule { }
