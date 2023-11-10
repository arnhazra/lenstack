import { Module } from "@nestjs/common"
import { UserService } from "./user.service"
import { UserController } from "./user.controller"
import { UserRepository } from "./user.repository"
import { WorkspaceRepository } from "../workspace/workspace.repository"

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, WorkspaceRepository],
})
export class UserModule { }
