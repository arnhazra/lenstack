import { Module } from "@nestjs/common"
import { HyperedgeService } from "./hyperedge.service"
import { HyperedgeController } from "./hyperedge.controller"
import { HyperedgeRepository } from "./hyperedge.repository"

@Module({
  controllers: [HyperedgeController],
  providers: [HyperedgeService, HyperedgeRepository],
})
export class HyperedgeModule { }
