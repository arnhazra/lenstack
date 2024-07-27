import { UserModel } from "../schemas/user.schema"

export async function createUserCommand(email: string) {
  const newUser = new UserModel({ email })
  await newUser.save()
  return newUser
}