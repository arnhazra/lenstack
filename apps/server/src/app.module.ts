import { Module } from "@nestjs/common"
import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "path"
import { CoreModule } from "./core/core.module"
import { ProductsModule } from "./products/products.module"
import { EventEmitterModule } from "@nestjs/event-emitter"

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, ".", "client"),
      exclude: ["server/*"]
    }),
    EventEmitterModule.forRoot(),
    CoreModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
