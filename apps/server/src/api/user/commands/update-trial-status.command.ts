import { UserModel } from "../models/user.model"

export async function updateTrialStatusCommand(userId: string, trialAvailable: boolean) {
  await UserModel.findByIdAndUpdate(userId, { trialAvailable })
  return true
}