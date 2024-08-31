import { MongooseModule } from "@nestjs/mongoose";
import { Module, DynamicModule } from "@nestjs/common";
import { envConfig } from "src/env.config";
import { DbConnectionMap } from "src/utils/db-connection.map";

@Module({})
export class DatabaseModule {
  static forChild(dbName: DbConnectionMap): DynamicModule {
    return MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: envConfig.productsDatabaseURI,
        dbName: dbName,
      }),
      connectionName: dbName,
    });
  }
}
