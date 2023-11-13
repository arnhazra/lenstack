import { Module } from "@nestjs/common"
import { UserModule } from "./user/user.module"
import { CommonModule } from "./common/common.module"
import { SubscriptionModule } from "./subscription/subscription.module"
import { ProductsModule } from "./products/products.module"
import { DocumentationModule } from "./documentation/documentation.module"
import { WorkspaceModule } from "./workspace/workspace.module"

@Module({
  imports: [UserModule, CommonModule, SubscriptionModule, ProductsModule, DocumentationModule, WorkspaceModule]
})
export class ApiModule { }
