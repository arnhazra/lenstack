import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { BlockchainRepository } from "../../blockchain.repository"
import { FindNetworkByIdQuery } from "../impl/find-netowork-by-id.query"
import { RpcNodes } from "../../schemas/blockchain.schema"

@QueryHandler(FindNetworkByIdQuery)
export class FindNetworkByIdQueryHandler implements IQueryHandler<FindNetworkByIdQuery> {
  constructor(private readonly blockchainRepository: BlockchainRepository) { }

  async execute(query: FindNetworkByIdQuery): Promise<RpcNodes> {
    const { networkId } = query
    return await this.blockchainRepository.findNetworkById(networkId)
  }
}
