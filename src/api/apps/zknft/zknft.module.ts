import { Module } from "@nestjs/common"
import { ZknftService } from "./zknft.service"
import { ZknftController } from "./zknft.controller"

@Module({
  controllers: [ZknftController],
  providers: [ZknftService],
})
export class ZknftModule { }
