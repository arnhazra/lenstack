import { UserModel } from "../models/user.model"

export async function findUserByEmailQuery(email: string) {
  return UserModel.findOne({ email })
}