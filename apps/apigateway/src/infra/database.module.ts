import { Module, DynamicModule } from "@nestjs/common"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { ModelDefinition, MongooseModule } from "@nestjs/mongoose"

@Module({})
export class DatabaseModule {
  static forRoot(uri: string, dbConnectionName: DbConnectionMap): DynamicModule {
    return MongooseModule.forRootAsync({
      useFactory: () => ({
        uri,
        dbName: dbConnectionName
      }),
      connectionName: dbConnectionName
    })
  }

  static forFeature(models: ModelDefinition[], dbConnectionName: DbConnectionMap): DynamicModule {
    return MongooseModule.forFeature(models, dbConnectionName)
  }
}