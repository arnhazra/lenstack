import { Module } from "@nestjs/common"
import { ProductsController } from "./products.controller"
import { ProductsService } from "./products.service"
import { Product, ProductSchema } from "./schemas/products.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { ProductsRepository } from "./products.repository"
import { GetProductsQueryHandler } from "./queries/handler/get-products.handler"
import { CqrsModule } from "@nestjs/cqrs"
import { DatabaseModule } from "src/infra/database.module"

@Module({
  imports: [
    CqrsModule,
    DatabaseModule.forFeature([{ name: Product.name, schema: ProductSchema }], DbConnectionMap.Core),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, GetProductsQueryHandler]
})

export class ProductsModule { }
