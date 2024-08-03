import { Module } from "@nestjs/common"
import { ApiReferenceService } from "./apireference.service"
import { ApiReferenceController } from "./apireference.controller"
import { ApiReferenceRepository } from "./apireference.repository"
import { CqrsModule } from "@nestjs/cqrs"
import { ApiReference, ApiReferenceSchema } from "./schemas/apireference.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { MongooseModule } from "@nestjs/mongoose"
import { FindAPIReferenceQueryHandler } from "./queries/handler/find-apireferences.handler"

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: ApiReference.name, schema: ApiReferenceSchema }], DbConnectionMap.Core),
  ],
  controllers: [ApiReferenceController],
  providers: [ApiReferenceService, ApiReferenceRepository, FindAPIReferenceQueryHandler],
})
export class ApiReferenceModule { }
