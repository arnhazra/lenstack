import { Module } from "@nestjs/common"
import { ApiReferenceModule } from "./apireference/apireference.module"
import { OrganizationModule } from "./organization/organization.module"
import { PricingModule } from "./pricing/pricing.module"
import { UserModule } from "./user/user.module"
import { ProductsModule } from "./product/products.module"
import { SolutionModule } from "./solution/solution.module"
import { MongooseModule } from "@nestjs/mongoose"
import { envConfig } from "src/env.config"
import { DbConnectionMap } from "src/utils/db-connection.map"

@Module({
  imports: [
    ApiReferenceModule,
    OrganizationModule,
    PricingModule,
    UserModule,
    ProductsModule,
    SolutionModule,
    MongooseModule.forRoot(envConfig.coreDatabaseURI, { connectionName: DbConnectionMap.Core }),
  ]
})
export class CoreModule { }
