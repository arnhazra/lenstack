import { Module } from "@nestjs/common"
import { HttpNosqlService } from "./httpnosql.service"
import { HttpNosqlController } from "./httpnosql.controller"
import { CqrsModule } from "@nestjs/cqrs"
import { envConfig } from "src/env.config"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { Data, DataSchema } from "./schemas/data.schema"
import { HttpNosqlRepository } from "./httpnosql.repository"
import { CreateDataCommandHandler } from "./commands/handler/create-data.handler"
import { DeleteDataCommandHandler } from "./commands/handler/delete-data.handler"
import { UpdateDataCommandHandler } from "./commands/handler/update-data.handler"
import { ReadAllDataQueryHandler } from "./queries/handler/read-all-values.handler"
import { ReadOneDataQueryHandler } from "./queries/handler/read-value-by-key.handler"
import { DatabaseModule } from "src/infra/database.module"

@Module({
  imports: [
    CqrsModule,
    DatabaseModule.forRoot(envConfig.productsDatabaseURI, DbConnectionMap.HttpNoSql),
    DatabaseModule.forFeature([{ name: Data.name, schema: DataSchema }], DbConnectionMap.HttpNoSql),
  ],
  controllers: [HttpNosqlController],
  providers: [
    HttpNosqlService,
    HttpNosqlRepository,
    CreateDataCommandHandler,
    UpdateDataCommandHandler,
    DeleteDataCommandHandler,
    ReadAllDataQueryHandler,
    ReadOneDataQueryHandler
  ],
})
export class HttpnosqlModule { }
