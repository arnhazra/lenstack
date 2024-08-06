import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { GetProductsQuery } from "../impl/get-products.query"
import { ProductsRepository } from "../../products.repository"

@QueryHandler(GetProductsQuery)
export class GetProductsQueryHandler implements IQueryHandler<GetProductsQuery> {
  constructor(private readonly repository: ProductsRepository) { }

  async execute(query: GetProductsQuery) {
    const { searchQuery, selectedFilter } = query
    return await this.repository.findAll(searchQuery, selectedFilter)
  }
}
