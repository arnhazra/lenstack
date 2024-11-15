import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindAPIReferencesQuery } from "../impl/find-apireferences.query"
import { ApiReferenceRepository } from "../../apireference.repository"

@QueryHandler(FindAPIReferencesQuery)
export class FindAPIReferencesQueryHandler
  implements IQueryHandler<FindAPIReferencesQuery>
{
  constructor(private readonly repository: ApiReferenceRepository) {}

  async execute(query: FindAPIReferencesQuery) {
    const { productName } = query
    return await this.repository.findAll({ productName })
  }
}
