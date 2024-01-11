import { Module } from "@nestjs/common"
import { UserModule } from "./user/user.module"
import { PlatformModule } from "./platform/platform.module"
import { SubscriptionModule } from "./subscription/subscription.module"
import { ProductsModule } from "./products/products.module"
import { ApiReferenceModule } from "./apireference/apireference.module"
import { WorkspaceModule } from "./workspace/workspace.module"
import { ActivityModule } from "./activity/activity.module"
import { TransactionModule } from "./transaction/transaction.module"

@Module({
  imports: [UserModule, PlatformModule, SubscriptionModule, ProductsModule, ApiReferenceModule, WorkspaceModule, ActivityModule, TransactionModule]
})
export class ApiModule { }
