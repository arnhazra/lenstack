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

  async findUserByIdAndUpdate(userId: string, property: string, value: string | boolean | number) {
    const objectToUpdate = {}
    objectToUpdate[property] = value
    await UserModel.findByIdAndUpdate(userId, objectToUpdate)
    return true
  }
}
