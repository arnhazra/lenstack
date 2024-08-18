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

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forRoot(envConfig.identityDatabaseURI, { connectionName: DbConnectionMap.Identity }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], DbConnectionMap.Identity),
  ],
  controllers: [IdentityController],
  providers: [
    IdentityService, IdentityRepository,
    CreateUserCommandHandler, FindUserByEmailQueryHandler,
    FindUserByIdQueryHandler
  ],
})
export class IdentityModule { }
