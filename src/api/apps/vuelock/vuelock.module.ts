import { Module } from "@nestjs/common"
import { VuelockService } from "./vuelock.service"
import { VuelockController } from "./vuelock.controller"
import { VuelockRepository } from "./vuelock.repository"

@Module({
  controllers: [VuelockController],
  providers: [VuelockService, VuelockRepository],
})
export class VuelockModule { }
