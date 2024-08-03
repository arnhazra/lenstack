import { Module } from "@nestjs/common"
import { UserService } from "./user.service"
import { UserController } from "./user.controller"
import { UserRepository } from "./user.repository"
import { MongooseModule } from "@nestjs/mongoose"
import { User, UserSchema } from "./schemas/user.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { CqrsModule } from "@nestjs/cqrs"
import { CreateUserCommandHandler } from "./commands/handler/create-user.handler"
import { UpdateCarbonSettingsCommandHandler } from "./commands/handler/update-carbon-settings.handler"
import { UpdateSelectedOrgCommandHandler } from "./commands/handler/update-selected-org.handler"
import { UpdateUsageInsightsSettingsCommandHandler } from "./commands/handler/update-usage-insights.handler"
import { SendPasskeyEventHandler } from "./events/handler/send-passkey-email.handler"
import { FindUserByEmailQueryQueryHandler } from "./queries/handler/find-user-by-email.handler"
import { FindUserByIdQueryQueryHandler } from "./queries/handler/find-user-by-id.handler"

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], DbConnectionMap.Core),
  ],
  controllers: [UserController],
  providers: [
    UserService, UserRepository,
    CreateUserCommandHandler, UpdateCarbonSettingsCommandHandler,
    UpdateSelectedOrgCommandHandler, UpdateUsageInsightsSettingsCommandHandler,
    SendPasskeyEventHandler, FindUserByEmailQueryQueryHandler, FindUserByIdQueryQueryHandler
  ],
})
export class UserModule { }
