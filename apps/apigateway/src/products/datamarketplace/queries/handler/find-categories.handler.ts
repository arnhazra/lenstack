import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindCatgoriesQuery } from "../impl/find-categories.query"
import { DatamarketplaceRepository } from "../../datamarketplace.repository"

@QueryHandler(FindCatgoriesQuery)
export class FindCategoriesQueryHandler
  implements IQueryHandler<FindCatgoriesQuery>
{
  constructor(private readonly repository: DatamarketplaceRepository) {}

  async execute(query: FindCatgoriesQuery) {
    return await this.repository.findUniqueCategories()
  }
}
