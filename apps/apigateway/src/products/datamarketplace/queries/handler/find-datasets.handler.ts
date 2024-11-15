import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindDatasetsQuery } from "../impl/find-datasets.query"
import { DatamarketplaceRepository } from "../../datamarketplace.repository"

@QueryHandler(FindDatasetsQuery)
export class FindDatasetsQueryHandler
  implements IQueryHandler<FindDatasetsQuery>
{
  constructor(private readonly repository: DatamarketplaceRepository) {}

  async execute(query: FindDatasetsQuery) {
    const { findDatasetsDto } = query
    return await this.repository.findDatasets(findDatasetsDto)
  }
}
