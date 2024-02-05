import { UserModel } from "../models/user.model"

export async function findUserByIdQuery(userId: string) {
  return UserModel.findById(userId).exec()
}