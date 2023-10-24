import { Module } from "@nestjs/common"
import { UserModule } from "./user/user.module"
import { CommonModule } from "./common/common.module"
import { SubscriptionModule } from "./subscription/subscription.module"
import { AppsModule } from "./apps/apps.module"
import { DocumentationModule } from "./documentation/documentation.module"

@Module({
  imports: [UserModule, CommonModule, SubscriptionModule, AppsModule, DocumentationModule]
})
export class ApiModule { }
