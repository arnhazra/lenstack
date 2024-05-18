import { UserModel } from "../models/user.model"

export async function updateTrialStatus(userId: string) {
  await UserModel.findByIdAndUpdate(userId, { isTrialAvailable: false })
  return true
}