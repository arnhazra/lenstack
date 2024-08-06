import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { FindGatewayFiltersQuery } from "../impl/find-gateway-filters.query"
import { BlockchainRepository } from "../../blockchain.repository"

@QueryHandler(FindGatewayFiltersQuery)
export class FindGatewayFiltersQueryHandler implements IQueryHandler<FindGatewayFiltersQuery> {
  constructor(private readonly blockchainRepository: BlockchainRepository) { }

  async execute(query: FindGatewayFiltersQuery) {
    return await this.blockchainRepository.findGatewayFilters()
  }
}
