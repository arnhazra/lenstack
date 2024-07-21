import { UserModel } from "../models/user.model"

export default async function updateCarbonSettings(userId: string, value: boolean) {
  await UserModel.findByIdAndUpdate(userId, { reduceCarbonEmissions: value })
  return true
}