import { Module } from "@nestjs/common"
import { UserService } from "./user.service"
import { UserController } from "./user.controller"
import { UserRepository } from "./user.repository"
import { User, UserSchema } from "./schemas/user.schema"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { CqrsModule } from "@nestjs/cqrs"
import { CreateUserCommandHandler } from "./commands/handler/create-user.handler"
import { FindUserByEmailQueryHandler } from "./queries/handler/find-user-by-email.handler"
import { FindUserByIdQueryHandler } from "./queries/handler/find-user-by-id.handler"
import { UpdateAttributeCommandHandler } from "./commands/handler/update-attribute.handler"
import { DatabaseModule } from "src/shared/database/database.module"

@Module({
  imports: [
    CqrsModule,
    DatabaseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      DbConnectionMap.Core
    ),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    CreateUserCommandHandler,
    UpdateAttributeCommandHandler,
    FindUserByEmailQueryHandler,
    FindUserByIdQueryHandler,
  ],
})
export class UserModule {}
