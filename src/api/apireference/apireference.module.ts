import { Module } from "@nestjs/common"
import { ApiReferenceService } from "./apireference.service"
import { ApiReferenceController } from "./apireference.controller"
import { ApiReferenceRepository } from "./apireference.repository"

@Module({
  controllers: [ApiReferenceController],
  providers: [ApiReferenceService, ApiReferenceRepository],
})
export class ApiReferenceModule { }
