import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindDatasetsQuery } from "../impl/find-datasets.query"
import { DatamarketplaceRepository } from "../../datamarketplace.repository"
import { Metadata } from "../../schemas/metadata.schema"

@QueryHandler(FindDatasetsQuery)
export class FindDatasetsQueryHandler implements IQueryHandler<FindDatasetsQuery> {
  constructor(private readonly repository: DatamarketplaceRepository) { }

  async execute(query: FindDatasetsQuery): Promise<Metadata[]> {
    const { findDatasetsDto } = query
    return await this.repository.findDatasets(findDatasetsDto)
  }
}
