import { Module } from "@nestjs/common"
import { UserModule } from "./user/user.module"
import { SubscriptionModule } from "./subscription/subscription.module"
import { ProductsModule } from "./products/products.module"
import { ApiReferenceModule } from "./apireference/apireference.module"
import { WorkspaceModule } from "./workspace/workspace.module"
import { InsightsModule } from './insights/insights.module';

@Module({
  imports: [UserModule, SubscriptionModule, ProductsModule, ApiReferenceModule, WorkspaceModule, InsightsModule]
})
export class ApiModule { }
