import { OrganizationModel } from "../schemas/organization.schema"

export async function findOrganizationByIdQuery(orgId: string) {
  const organization = await OrganizationModel.findById(orgId)
  return organization
}