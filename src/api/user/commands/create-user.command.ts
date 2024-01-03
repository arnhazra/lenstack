import { UserModel } from "../models/user.model"

export async function createUserCommand(email: string, privateKey: string) {
  const newUser = new UserModel({ email, privateKey })
  await newUser.save()
  return newUser
}