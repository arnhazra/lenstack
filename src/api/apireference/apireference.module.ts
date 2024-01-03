import { Module } from "@nestjs/common"
import { ApiReferenceService } from "./apireference.service"
import { ApiReferenceController } from "./apireference.controller"

@Module({
  controllers: [ApiReferenceController],
  providers: [ApiReferenceService],
})
export class ApiReferenceModule { }
