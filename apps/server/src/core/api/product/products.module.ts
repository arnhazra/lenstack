import { Module } from "@nestjs/common"
import { ProductsController } from "./products.controller"
import { ProductsService } from "./products.service"
import { MongooseModule } from "@nestjs/mongoose"
import { Product, ProductSchema } from "./schemas/products.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { ProductsRepository } from "./products.repository"
import { GetProductsQueryHandler } from "./queries/handler/get-products.handler"
import { CqrsModule } from "@nestjs/cqrs"

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }], DbConnectionMap.Core),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, GetProductsQueryHandler]
})

export class ProductsModule { }
