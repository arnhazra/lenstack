import { UserModel } from "../schemas/user.schema"

export async function findUserByIdQuery(userId: string) {
  return UserModel.findById(userId).exec()
}