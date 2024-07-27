import { Module } from "@nestjs/common"
import { AccesstokenService } from "./accesstoken.service"
import { AccesstokenController } from "./accesstoken.controller"

@Module({
  controllers: [AccesstokenController],
  providers: [AccesstokenService],
})
export class AccesstokenModule { }
