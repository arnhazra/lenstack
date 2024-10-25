import { Module } from "@nestjs/common"
import { IntelligenceModule } from "./intelligence/intelligence.module"
import { DatamarketplaceModule } from "./datamarketplace/datamarketplace.module"
import { HttpnosqlModule } from "./httpnosql/httpnosql.module"
import { WebAnalyticsModule } from "./webanalytics/webanalytics.module"

@Module({
	imports: [
		IntelligenceModule,
		DatamarketplaceModule,
		HttpnosqlModule,
		WebAnalyticsModule,
	],
})
export class ProductsModule {}
