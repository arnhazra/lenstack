import { Module } from "@nestjs/common"
import { WalletService } from "./wallet.service"
import { WalletController } from "./wallet.controller"
import { WalletRepository } from "./wallet.repository"
import { HttpModule } from "@nestjs/axios"

@Module({
  imports: [HttpModule],
  controllers: [WalletController],
  providers: [WalletService, WalletRepository],
})
export class WalletModule { }
