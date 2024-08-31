import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { User, UserSchema } from "./schemas/user.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { CqrsModule } from "@nestjs/cqrs"
import { CreateUserCommandHandler } from "./commands/handler/create-user.handler"
import { FindUserByEmailQueryHandler } from "./queries/handler/find-user-by-email.handler"
import { FindUserByIdQueryHandler } from "./queries/handler/find-user-by-id.handler"
import { IdentityController } from "./identity.controller"
import { IdentityService } from "./identity.service"
import { IdentityRepository } from "./identity.repository"
import { envConfig } from "src/env.config"
import { FindUsersByOrgQueryHandler } from "./queries/handler/find-users-by-org.handler"

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], DbConnectionMap.Identity),
  ],
  controllers: [IdentityController],
  providers: [
    IdentityService, IdentityRepository,
    CreateUserCommandHandler, FindUserByEmailQueryHandler,
    FindUserByIdQueryHandler, FindUsersByOrgQueryHandler
  ],
})
export class IdentityModule { }
