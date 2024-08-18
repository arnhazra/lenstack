import { Module } from "@nestjs/common"
import { ApiReferenceModule } from "./apireference/apireference.module"
import { OrganizationModule } from "./organization/organization.module"
import { PricingModule } from "./pricing/pricing.module"
import { UserModule } from "./user/user.module"
import { ProductsModule } from "./product/products.module"
import { SolutionModule } from "./solution/solution.module"

@Module({
  imports: [ApiReferenceModule, OrganizationModule, PricingModule, UserModule, ProductsModule, SolutionModule]
})
export class ApiModule { }
