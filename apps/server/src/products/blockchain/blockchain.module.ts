import { Module } from "@nestjs/common"
import { BlockchainService } from "./blockchain.service"
import { BlockchainController } from "./blockchain.controller"
import { HttpModule } from "@nestjs/axios"
import { BlockchainRepository } from "./blockchain.repository"
import { CqrsModule } from "@nestjs/cqrs"
import { MongooseModule } from "@nestjs/mongoose"
import { envConfig } from "src/env.config"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { RpcNodes, RpcNodesSchema } from "./schemas/blockchain.schema"
import { FindNetworkByIdQueryHandler } from "./queries/handler/find-network-by-id.handler"
import { FindGatewayFiltersQueryHandler } from "./queries/handler/find-gateway-filters.handler"
import { FindNetworkFiltersQueryHandler } from "./queries/handler/find-network-filters.handler"
import { FindNetworksQueryHandler } from "./queries/handler/find-networks.handler"

@Module({
  imports: [
    HttpModule,
    CqrsModule,
    MongooseModule.forRoot(envConfig.blockchainDatabaseURI, { connectionName: DbConnectionMap.Blockchain }),
    MongooseModule.forFeature([{ name: RpcNodes.name, schema: RpcNodesSchema }], DbConnectionMap.Blockchain),
  ],
  controllers: [BlockchainController],
  providers: [
    BlockchainService,
    BlockchainRepository,
    FindNetworkByIdQueryHandler,
    FindGatewayFiltersQueryHandler,
    FindNetworkFiltersQueryHandler,
    FindNetworksQueryHandler
  ],
})
export class BlockchainModule { }