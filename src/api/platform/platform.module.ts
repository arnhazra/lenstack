import { Module } from "@nestjs/common"
import { PlatformService } from "./platform.service"
import { PlatformController } from "./platform.controller"

@Module({
  controllers: [PlatformController],
  providers: [PlatformService],
})
export class PlatformModule { }
