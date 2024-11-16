import { Module } from "@nestjs/common"
import { ApiReferenceModule } from "./apireference/apireference.module"
import { WorkspaceModule } from "./workspace/workspace.module"
import { SubscriptionModule } from "./subscription/subscription.module"
import { UserModule } from "./user/user.module"
import { ProductsModule } from "./product/products.module"
import { SolutionModule } from "./solution/solution.module"
import { envConfig } from "src/config"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { ActivityModule } from "./activity/activity.module"
import { TokenModule } from "./token/token.module"
import { EmailModule } from "./email/email.module"
import { DatabaseModule } from "src/shared/database/database.module"

@Module({
  imports: [
    DatabaseModule.forRoot(envConfig.coreDatabaseURI, DbConnectionMap.Core),
    ApiReferenceModule,
    ActivityModule,
    WorkspaceModule,
    SubscriptionModule,
    UserModule,
    ProductsModule,
    SolutionModule,
    TokenModule,
    EmailModule,
  ],
})
export class CoreModule {}
