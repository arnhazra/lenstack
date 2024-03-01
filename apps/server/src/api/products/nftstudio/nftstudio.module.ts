import { Module } from "@nestjs/common"
import { NftstudioService } from "./nftstudio.service"
import { NftstudioController } from "./nftstudio.controller"

@Module({
  controllers: [NftstudioController],
  providers: [NftstudioService],
})
export class NftstudioModule { }
