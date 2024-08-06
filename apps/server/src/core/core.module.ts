import { Module } from "@nestjs/common"
import { ApiModule } from "./api/api.module"
import { EventsModule } from "./events/events.module"
import { MongooseModule } from "@nestjs/mongoose"
import { envConfig } from "src/env.config"
import { DbConnectionMap } from "src/utils/db-connection.map"

@Module({
  imports: [
    ApiModule,
    EventsModule,
    MongooseModule.forRoot(envConfig.coreDatabaseURI, { connectionName: DbConnectionMap.Core }),
  ]
})
export class CoreModule { }
