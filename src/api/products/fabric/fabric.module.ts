import { Module } from "@nestjs/common"
import { FabricService } from "./fabric.service"
import { FabricController } from "./fabric.controller"
import { FabricRepository } from "./fabric.repository"

@Module({
  controllers: [FabricController],
  providers: [FabricService, FabricRepository],
})
export class FabricModule { }
