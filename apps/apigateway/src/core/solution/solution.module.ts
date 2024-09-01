import { Module } from "@nestjs/common"
import { SolutionController } from "./solution.controller"
import { SolutionService } from "./solution.service"
import { CqrsModule } from "@nestjs/cqrs"
import { Solution, SolutionSchema } from "./schemas/solutions.schema"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { GetSolutionsQueryHandler } from "./queries/handler/get-solutions.handler"
import { SolutionsRepository } from "./solution.repository"
import { DatabaseModule } from "src/shared/database/database.module"

@Module({
  imports: [
    CqrsModule,
    DatabaseModule.forFeature([{ name: Solution.name, schema: SolutionSchema }], DbConnectionMap.Core),
  ],
  controllers: [SolutionController],
  providers: [SolutionService, SolutionsRepository, GetSolutionsQueryHandler]
})

export class SolutionModule { }
