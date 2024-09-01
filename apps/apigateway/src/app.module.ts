import { Module } from "@nestjs/common"
import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "path"
import { CoreModule } from "./core/core.module"
import { ProductsModule } from "./products/products.module"
import { EventEmitterModule } from "@nestjs/event-emitter"
import { DatabaseModule } from "./shared/database/database.module"

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, ".", "uiservice"),
      exclude: ["apigateway/*"]
    }),
    EventEmitterModule.forRoot(),
    CoreModule,
    ProductsModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
