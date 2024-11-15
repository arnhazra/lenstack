import { Module } from "@nestjs/common"
import { CoreModule } from "./core/core.module"
import { ProductsModule } from "./products/products.module"
import { EventEmitterModule } from "@nestjs/event-emitter"
import { DatabaseModule } from "./shared/database/database.module"
import { AppController } from "./app.controller"

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    CoreModule,
    ProductsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
