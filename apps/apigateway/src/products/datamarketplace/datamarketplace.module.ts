import { Module } from "@nestjs/common"
import { DatamarketplaceService } from "./datamarketplace.service"
import { DatamarketplaceController } from "./datamarketplace.controller"
import { CqrsModule } from "@nestjs/cqrs"
import { envConfig } from "src/env.config"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { Dataset, DatasetSchema } from "./schemas/dataset.schema"
import { Metadata, MetadataSchema } from "./schemas/metadata.schema"
import { DatamarketplaceRepository } from "./datamarketplace.repository"
import { FindCategoriesQueryHandler } from "./queries/handler/find-categories.handler"
import { FindDataByIdQueryHandler } from "./queries/handler/find-data.handler"
import { FindDatasetsQueryHandler } from "./queries/handler/find-datasets.handler"
import { FindMetaDataByIdQueryHandler } from "./queries/handler/find-metadata.handler"
import { DatabaseModule } from "src/shared/database/database.module"

@Module({
	imports: [
		CqrsModule,
		DatabaseModule.forRoot(
			envConfig.productsDatabaseURI,
			DbConnectionMap.DataMarketplace
		),
		DatabaseModule.forFeature(
			[
				{ name: Dataset.name, schema: DatasetSchema },
				{ name: Metadata.name, schema: MetadataSchema },
			],
			DbConnectionMap.DataMarketplace
		),
	],
	controllers: [DatamarketplaceController],
	providers: [
		DatamarketplaceService,
		DatamarketplaceRepository,
		FindCategoriesQueryHandler,
		FindDataByIdQueryHandler,
		FindDatasetsQueryHandler,
		FindMetaDataByIdQueryHandler,
	],
})
export class DatamarketplaceModule {}
