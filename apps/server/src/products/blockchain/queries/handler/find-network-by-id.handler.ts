import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { BlockchainRepository } from "../../blockchain.repository"
import { FindNetworkByIdQuery } from "../impl/find-netowork-by-id.query"

@QueryHandler(FindNetworkByIdQuery)
export class FindNetworkByIdQueryHandler implements IQueryHandler<FindNetworkByIdQuery> {
  constructor(private readonly blockchainRepository: BlockchainRepository) { }

  async execute(query: FindNetworkByIdQuery) {
    const { networkId } = query
    return await this.blockchainRepository.findNetworkById(networkId)
  }
}
