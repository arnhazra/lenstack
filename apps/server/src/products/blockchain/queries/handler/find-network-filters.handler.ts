import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { BlockchainRepository } from "../../blockchain.repository"
import { FindNetworkFiltersQuery } from "../impl/find-netowork-filters.query"

@QueryHandler(FindNetworkFiltersQuery)
export class FindNetworkFiltersQueryHandler implements IQueryHandler<FindNetworkFiltersQuery> {
  constructor(private readonly blockchainRepository: BlockchainRepository) { }

  async execute(query: FindNetworkFiltersQuery) {
    return await this.blockchainRepository.findNetworkFilters()
  }
}
