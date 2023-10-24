import { Module } from "@nestjs/common"
import { DocumentationService } from "./documentation.service"
import { DocumentationController } from "./documentation.controller"
import { DocumentationRepository } from "./documentation.repository"

@Module({
  controllers: [DocumentationController],
  providers: [DocumentationService, DocumentationRepository],
})
export class DocumentationModule { }
