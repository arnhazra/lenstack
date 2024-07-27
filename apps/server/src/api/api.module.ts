import { Module } from "@nestjs/common"
import { ApiReferenceModule } from "./apireference/apireference.module"
import { InsightsModule } from "./insights/insights.module"
import { ProductsModule } from "./products/products.module"
import { SubscriptionModule } from "./subscription/subscription.module"
import { UserModule } from "./user/user.module"
import { OrganizationModule } from "./organization/organization.module"

@Module({
  imports: [UserModule, SubscriptionModule, ProductsModule, ApiReferenceModule, OrganizationModule, InsightsModule]
})
export class ApiModule { }
