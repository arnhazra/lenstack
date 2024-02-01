import { Module } from "@nestjs/common"
import { WalletService } from "./wallet.service"
import { WalletController } from "./wallet.controller"
import { WalletRepository } from "./wallet.repository"

@Module({
  controllers: [WalletController],
  providers: [WalletService, WalletRepository],
})
export class WalletModule { }
