import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { BlockchainRepository } from "../../blockchain.repository"
import { FindNetworksQuery } from "../impl/find-netoworks.query"
import { RpcNodes } from "../../schemas/rpcnode.schema"

@QueryHandler(FindNetworksQuery)
export class FindNetworksQueryHandler implements IQueryHandler<FindNetworksQuery> {
  constructor(private readonly blockchainRepository: BlockchainRepository) { }

  async execute(query: FindNetworksQuery): Promise<RpcNodes[]> {
    return await this.blockchainRepository.findNetworks(query)
  }
}
