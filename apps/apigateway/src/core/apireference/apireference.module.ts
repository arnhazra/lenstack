import { Module } from "@nestjs/common"
import { ApiReferenceService } from "./apireference.service"
import { ApiReferenceController } from "./apireference.controller"
import { ApiReferenceRepository } from "./apireference.repository"
import { CqrsModule } from "@nestjs/cqrs"
import { ApiReference, ApiReferenceSchema } from "./schemas/apireference.schema"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { FindAPIReferencesQueryHandler } from "./queries/handler/find-apireferences.handler"
import { DatabaseModule } from "src/shared/database/database.module"

@Module({
  imports: [
    CqrsModule,
    DatabaseModule.forFeature([{ name: ApiReference.name, schema: ApiReferenceSchema }], DbConnectionMap.Core),
  ],
  controllers: [ApiReferenceController],
  providers: [ApiReferenceService, ApiReferenceRepository, FindAPIReferencesQueryHandler],
})
export class ApiReferenceModule { }
