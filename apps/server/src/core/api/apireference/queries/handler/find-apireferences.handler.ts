import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindAPIReferencesQuery } from "../impl/find-apireferences.query"
import { ApiReference } from "../../schemas/apireference.schema"
import { ApiReferenceRepository } from "../../apireference.repository"

@QueryHandler(FindAPIReferencesQuery)
export class FindAPIReferenceQueryHandler implements IQueryHandler<FindAPIReferencesQuery> {
  constructor(private readonly repository: ApiReferenceRepository) { }

  async execute(query: FindAPIReferencesQuery): Promise<ApiReference[]> {
    const { productName } = query
    return await this.repository.getApiReferenceByProductName(productName)
  }
}
