import { Module } from "@nestjs/common"
import { CopilotService } from "./copilot.service"
import { CopilotController } from "./copilot.controller"
import { CqrsModule } from "@nestjs/cqrs"
import { envConfig } from "src/env.config"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { Query, QuerySchema } from "./schemas/query.schema"
import { CreateQueryCommandHandler } from "./commands/handler/create-query.handler"
import { CopilotRepository } from "./copilot.repository"
import { DatabaseModule } from "src/infra/database.module"

@Module({
  imports: [
    CqrsModule,
    DatabaseModule.forRoot(envConfig.productsDatabaseURI, DbConnectionMap.Copilot),
    DatabaseModule.forFeature([{ name: Query.name, schema: QuerySchema }], DbConnectionMap.Copilot),
  ],
  controllers: [CopilotController],
  providers: [CopilotService, CopilotRepository, CreateQueryCommandHandler],
})
export class CopilotModule { }
