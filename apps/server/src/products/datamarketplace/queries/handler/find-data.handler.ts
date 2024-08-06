import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindDataByIdQuery } from "../impl/find-data.query"
import { DatamarketplaceRepository } from "../../datamarketplace.repository"

@QueryHandler(FindDataByIdQuery)
export class FindDataByIdQueryHandler implements IQueryHandler<FindDataByIdQuery> {
  constructor(private readonly repository: DatamarketplaceRepository) { }

  async execute(query: FindDataByIdQuery) {
    const { datasetId } = query
    return await this.repository.findDataById(datasetId)
  }
}
