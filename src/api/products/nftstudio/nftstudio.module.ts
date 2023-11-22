import { Module } from "@nestjs/common"
import { NftstudioService } from "./nftstudio.service"
import { NftstudioController } from "./nftstudio.controller"
import { NftstudioRepository } from "./nftstudio.repository"
import { HttpModule } from "@nestjs/axios"

@Module({
  imports: [HttpModule],
  controllers: [NftstudioController],
  providers: [NftstudioService, NftstudioRepository],
})
export class NftstudioModule { }
