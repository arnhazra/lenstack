import { Module } from '@nestjs/common'
import { BlockchainService } from './blockchain.service'
import { BlockchainController } from './blockchain.controller'
import { HttpModule } from "@nestjs/axios"

@Module({
  imports: [HttpModule],
  controllers: [BlockchainController],
  providers: [BlockchainService],
})
export class BlockchainModule { }
