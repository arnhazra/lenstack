import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { GetProductsQuery } from "../impl/get-products.query"
import { ProductsRepository } from "../../products.repository"
import { Product } from "../../schemas/products.schema"

@QueryHandler(GetProductsQuery)
export class GetProductsQueryHandler implements IQueryHandler<GetProductsQuery> {
  constructor(private readonly repository: ProductsRepository) { }

  async execute(query: GetProductsQuery): Promise<Product[]> {
    const { searchQuery, selectedFilter } = query
    return await this.repository.getProductConfig(searchQuery, selectedFilter)
  }
}
