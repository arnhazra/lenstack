import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { DatamarketplaceRepository } from "../../datamarketplace.repository"
import { FindMetadataByIdQuery } from "../impl/find-metadata.query"
import objectId from "src/shared/utils/convert-objectid"

@QueryHandler(FindMetadataByIdQuery)
export class FindMetaDataByIdQueryHandler
  implements IQueryHandler<FindMetadataByIdQuery>
{
  constructor(private readonly repository: DatamarketplaceRepository) {}

  async execute(query: FindMetadataByIdQuery) {
    const { datasetId } = query
    return await this.repository.findMetaDataById(objectId(datasetId))
  }
}
