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
import { ActivityModule } from "./activity/activity.module"
import { TokenModule } from "./token/token.module"
import { EmailModule } from "./email/email.module";

@Module({
  imports: [
    ApiReferenceModule,
    ActivityModule,
    OrganizationModule,
    PricingModule,
    UserModule,
    ProductsModule,
    SolutionModule,
    TokenModule,
    MongooseModule.forRoot(envConfig.coreDatabaseURI, { connectionName: DbConnectionMap.Core }),
    EmailModule,
  ]
})
export class CoreModule { }
