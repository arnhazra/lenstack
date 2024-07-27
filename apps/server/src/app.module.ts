import { Module } from "@nestjs/common"
import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "path"
import { CoreModule } from './core/core.module'
import { ProductsModule } from './products/products.module'

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, ".", "client"),
    exclude: ["server/*"]
  }), CoreModule, ProductsModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
