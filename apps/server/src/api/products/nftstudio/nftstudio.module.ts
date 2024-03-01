import { Module } from "@nestjs/common"
import { NftstudioService } from "./nftstudio.service"
import { NftstudioController } from "./nftstudio.controller"
import { HttpModule } from "@nestjs/axios"

@Module({
  imports: [HttpModule],
  controllers: [NftstudioController],
  providers: [NftstudioService],
})
export class NftstudioModule { }
