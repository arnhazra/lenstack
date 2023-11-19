import { UserModel, NewUser } from "./entities/user.entity"
import { Injectable } from "@nestjs/common"

@Injectable()
export class UserRepository {
  async createNewUser(user: NewUser) {
    const newUser = new UserModel(user)
    await newUser.save()
    return newUser
  }

  async findUserByEmail(email: string) {
    return UserModel.findOne({ email })
  }

  async findUserById(userId: string) {
    return UserModel.findById(userId).exec()
  }

  async findUserByIdAndUpdateTrialStatus(userId: string, trialAvailable: boolean) {
    await UserModel.findByIdAndUpdate(userId, { trialAvailable })
    return true
  }

  async findUserByIdAndUpdateSelectedWorkspace(userId: string, selectedWorkspaceId: string) {
    await UserModel.findByIdAndUpdate(userId, { selectedWorkspaceId })
    return true
  }
}
