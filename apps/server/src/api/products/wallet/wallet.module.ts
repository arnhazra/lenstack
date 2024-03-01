import { Module } from "@nestjs/common"
import { WalletService } from "./wallet.service"
import { WalletController } from "./wallet.controller"
import { HttpModule } from "@nestjs/axios"

@Module({
  imports: [HttpModule],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule { }
