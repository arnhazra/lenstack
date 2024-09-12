import { Module } from "@nestjs/common"
import { IntelligenceService } from "./intelligence.service"
import { IntelligenceController } from "./intelligence.controller"
import { CqrsModule } from "@nestjs/cqrs"
import { envConfig } from "src/env.config"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { Query, QuerySchema } from "./schemas/query.schema"
import { CreateQueryCommandHandler } from "./commands/handler/create-query.handler"
import { IntelligenceRepository } from "./intelligence.repository"
import { DatabaseModule } from "src/shared/database/database.module"

@Module({
  imports: [
    CqrsModule,
    DatabaseModule.forRoot(envConfig.productsDatabaseURI, DbConnectionMap.Intelligence),
    DatabaseModule.forFeature([{ name: Query.name, schema: QuerySchema }], DbConnectionMap.Intelligence),
  ],
  controllers: [IntelligenceController],
  providers: [IntelligenceService, IntelligenceRepository, CreateQueryCommandHandler],
})
export class IntelligenceModule { }
