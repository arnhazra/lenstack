import { UserModel } from "../schemas/user.schema"

export async function findUserByEmailQuery(email: string) {
  return UserModel.findOne({ email })
}