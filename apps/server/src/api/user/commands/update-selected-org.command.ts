import { UserModel } from "../models/user.model"

export async function updateSelectedOrganizationCommand(userId: string, selectedOrgId: string) {
  await UserModel.findByIdAndUpdate(userId, { selectedOrgId })
  return true
}