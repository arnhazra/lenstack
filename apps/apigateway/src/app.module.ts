import { Module } from "@nestjs/common"
import { CoreModule } from "./core/core.module"
import { ProductsModule } from "./products/products.module"
import { EventEmitterModule } from "@nestjs/event-emitter"
import { DatabaseModule } from "./shared/database/database.module"

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    CoreModule,
    ProductsModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
