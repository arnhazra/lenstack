import { Module } from "@nestjs/common"
import { TransactionService } from "./transaction.service"
import { TransactionController } from "./transaction.controller"
import { HttpModule } from "@nestjs/axios"

@Module({
  imports: [HttpModule],
  controllers: [TransactionController],
  providers: [TransactionService,],
})
export class TransactionModule { }
