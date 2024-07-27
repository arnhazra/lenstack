import { OrganizationModel } from "../schemas/organization.schema"

export async function deleteOrganizationCommand(orgId: string) {
  await OrganizationModel.findByIdAndDelete(orgId)
  return true
}