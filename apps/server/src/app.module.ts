import { Module } from "@nestjs/common"
import { ApiModule } from "./api/api.module"
import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "path"

@Module({
  imports: [ApiModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, "../..", "client", "out"),
    exclude: ["api/*"]
  }),],
  controllers: [],
  providers: [],
})
export class AppModule { }
