import { Module } from "@nestjs/common"
import { UserModule } from "./user/user.module"
import { SubscriptionModule } from "./subscription/subscription.module"
import { ProductsModule } from "./products/products.module"
import { ApiReferenceModule } from "./apireference/apireference.module"
import { WorkspaceModule } from "./workspace/workspace.module"
import { SustainabilityModule } from "./sustainability/sustainability.module"

@Module({
  imports: [UserModule, SubscriptionModule, ProductsModule, ApiReferenceModule, WorkspaceModule, SustainabilityModule]
})
export class ApiModule { }
