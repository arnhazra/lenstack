import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { DatamarketplaceRepository } from "../../datamarketplace.repository"
import { FindMetadataByIdQuery } from "../impl/find-metadata.query"
import { Types } from "mongoose"

@QueryHandler(FindMetadataByIdQuery)
export class FindMetaDataByIdQueryHandler
	implements IQueryHandler<FindMetadataByIdQuery>
{
	constructor(private readonly repository: DatamarketplaceRepository) {}

	async execute(query: FindMetadataByIdQuery) {
		const { datasetId } = query
		return await this.repository.findMetaDataById(new Types.ObjectId(datasetId))
	}
}
