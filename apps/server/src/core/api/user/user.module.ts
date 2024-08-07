import { Module } from "@nestjs/common"
import { UserService } from "./user.service"
import { UserController } from "./user.controller"
import { UserRepository } from "./user.repository"
import { MongooseModule } from "@nestjs/mongoose"
import { User, UserSchema } from "./schemas/user.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { CqrsModule } from "@nestjs/cqrs"
import { CreateUserCommandHandler } from "./commands/handler/create-user.handler"
import { FindUserByEmailQueryHandler } from "./queries/handler/find-user-by-email.handler"
import { FindUserByIdQueryHandler } from "./queries/handler/find-user-by-id.handler"
import { UpdateAttributeCommandHandler } from "./commands/handler/update-attribute.handler"

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], DbConnectionMap.Core),
  ],
  controllers: [UserController],
  providers: [
    UserService, UserRepository,
    CreateUserCommandHandler, UpdateAttributeCommandHandler,
    FindUserByEmailQueryHandler, FindUserByIdQueryHandler
  ],
})
export class UserModule { }
