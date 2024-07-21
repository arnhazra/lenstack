import { UserModel } from "../models/user.model"

export async function createUserCommand(email: string) {
  const newUser = new UserModel({ email })
  await newUser.save()
  return newUser
}