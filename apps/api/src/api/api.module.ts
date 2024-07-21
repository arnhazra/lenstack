import { Module } from "@nestjs/common"
import { ApiReferenceModule } from "./apireference/apireference.module"
import { InsightsModule } from "./insights/insights.module"
import { ProductsModule } from "./products/products.module"
import { SubscriptionModule } from "./subscription/subscription.module"
import { UserModule } from "./user/user.module"
import { WorkspaceModule } from "./workspace/workspace.module"

@Module({
  imports: [UserModule, SubscriptionModule, ProductsModule, ApiReferenceModule, WorkspaceModule, InsightsModule]
})
export class ApiModule { }
