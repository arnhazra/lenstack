import { MasterUserModel, NewUser, User } from "./entities/user.entity"
import { Injectable } from "@nestjs/common"

@Injectable()
export class UserRepository {
  async createNewUser(user: NewUser): Promise<User | null> {
    const newUser = new MasterUserModel(user)
    await newUser.save()
    return newUser
  }

  async findUserByEmail(email: string) {
    return MasterUserModel.findOne({ email })
  }

  async findUserById(userId: string) {
    return MasterUserModel.findById(userId).exec()
  }

  async findUserByIdAndUpdate(userId: string, property: string, value: string | boolean | number) {
    const objectToUpdate = {}
    objectToUpdate[property] = value
    await MasterUserModel.findByIdAndUpdate(userId, objectToUpdate)
    return true
  }
}
