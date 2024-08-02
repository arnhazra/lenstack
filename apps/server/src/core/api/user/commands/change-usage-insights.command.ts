import { UserModel } from "../schemas/user.schema"

export default async function changeUsageInsights(userId: string, value: boolean) {
  await UserModel.findByIdAndUpdate(userId, { usageInsights: value })
  return true
}