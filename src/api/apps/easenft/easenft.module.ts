import { Module } from "@nestjs/common"
import { EasenftService } from "./easenft.service"
import { EasenftController } from "./easenft.controller"
import { EasenftRepository } from "./easenft.repository"

@Module({
  controllers: [EasenftController],
  providers: [EasenftService, EasenftRepository],
})
export class EasenftModule { }
