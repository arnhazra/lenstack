import { MasterUserModel, NewUser, ReplicaUserModel, User } from "./entities/user.entity"
import { Injectable } from "@nestjs/common"

@Injectable()
export class UserRepository {
  async createNewUser(user: NewUser): Promise<User | null> {
    const newUser = new MasterUserModel(user)
    const newUserReplica = new ReplicaUserModel(user)
    await newUser.save()
    await newUserReplica.save()
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
    await ReplicaUserModel.findByIdAndUpdate(userId, objectToUpdate)
    return true
  }
}
