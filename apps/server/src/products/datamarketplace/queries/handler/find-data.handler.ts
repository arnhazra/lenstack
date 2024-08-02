import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindDataByIdQuery } from "../impl/find-data.query"
import { DatamarketplaceRepository } from "../../datamarketplace.repository"
import { Dataset } from "../../schemas/dataset.schema"

@QueryHandler(FindDataByIdQuery)
export class FindDataByIdQueryHandler implements IQueryHandler<FindDataByIdQuery> {
  constructor(private readonly repository: DatamarketplaceRepository) { }

  async execute(query: FindDataByIdQuery): Promise<Dataset> {
    const { datasetId } = query
    return await this.repository.findDataById(datasetId)
  }
}
