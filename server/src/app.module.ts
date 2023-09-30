import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "path"
import { ApiModule } from "./api/api.module"

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "client"),
    }),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }