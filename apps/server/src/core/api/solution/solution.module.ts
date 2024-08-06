import { Module } from "@nestjs/common"
import { SolutionController } from "./solution.controller"
import { SolutionService } from "./solution.service"
import { CqrsModule } from "@nestjs/cqrs"
import { MongooseModule } from "@nestjs/mongoose"
import { Solution, SolutionSchema } from "./schemas/solutions.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { GetSolutionsQueryHandler } from "./queries/handler/get-solutions.handler"
import { SolutionsRepository } from "./solution.repository"

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Solution.name, schema: SolutionSchema }], DbConnectionMap.Core),
  ],
  controllers: [SolutionController],
  providers: [SolutionService, SolutionsRepository, GetSolutionsQueryHandler]
})

export class SolutionModule { }
