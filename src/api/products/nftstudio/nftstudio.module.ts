import { Module } from "@nestjs/common"
import { NftstudioService } from "./nftstudio.service"
import { NftstudioController } from "./nftstudio.controller"
import { NftstudioRepository } from "./nftstudio.repository"

@Module({
  controllers: [NftstudioController],
  providers: [NftstudioService, NftstudioRepository],
})
export class NftstudioModule { }
