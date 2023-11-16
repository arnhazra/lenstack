import { Module } from "@nestjs/common"
import { PlatformService } from "./platform.service"
import { PlatformController } from "./platform.controller"
import { PlatformRepository } from "./platform.repositiory"

@Module({
  controllers: [PlatformController],
  providers: [PlatformService, PlatformRepository],
})
export class PlatformModule { }
