import { Module } from "@nestjs/common"
import { UserService } from "./user.service"
import { UserController } from "./user.controller"
import { UserRepository } from "./user.repository"
import { MongooseModule } from "@nestjs/mongoose"
import { User, UserSchema } from "./schemas/user.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { CqrsModule } from "@nestjs/cqrs"
import { CreateUserCommandHandler } from "./commands/handler/create-user.command"
import { UpdateCarbonSettingsCommandHandler } from "./commands/handler/update-carbon-settings.command"
import { UpdateSelectedOrgCommandHandler } from "./commands/handler/update-selected-org.command"
import { UpdateUsageInsightsSettingsCommandHandler } from "./commands/handler/update-usage-insights.command"
import { SendPasskeyEventHandler } from "./events/handler/send-passkey-email.handler"
import { FindUserByEmailQueryQueryHandler } from "./queries/handler/find-user-by-email.handler"
import { FindUserByIdQueryQueryHandler } from "./queries/handler/find-user-by-id.handler"
import { OrganizationModule } from "../organization/organization.module"

@Module({
  imports: [
    OrganizationModule,
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
