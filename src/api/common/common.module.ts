import { Module } from "@nestjs/common"
import { CommonService } from "./common.service"
import { CommonController } from "./common.controller"
import { CommonRepository } from "./common.repository"

@Module({
  controllers: [CommonController],
  providers: [CommonService, CommonRepository],
})
export class CommonModule { }
